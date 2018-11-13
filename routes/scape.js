require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Amazon = require('../models/Amazon');
const fetchTweets = require('../middlewares/fetchTweets');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const PersonalityTextSummaries = require('personality-text-summary');
const authenticate = require('../middlewares/authenticate');
const reviewsCrawler = require('amazon-reviews-crawler');
const profile = require('../profile');
const redisConfig = {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASSWORD,
    options: {
      no_ready_check: false
    }
  }
};

const kue = require('kue');
const queue = kue.createQueue(redisConfig);

const personality_insights = new PersonalityInsightsV3({
  username: process.env.PERSONALITY_INSIGHTS_USERNAME,
  password: process.env.PERSONALITY_INSIGHTS_PASSWORD,
  version_date: '2018-09-18'
});

const v3EnglishTextSummaries = new PersonalityTextSummaries({
  locale: 'en',
  version: 'v3'
});

const router = express.Router();

router.post('/analyze/twitter', authenticate, (req, res) => {
  fetchTweets(req.body.handle)
    .then(tweets => {
      let params = {
        content_items: tweets,
        consumption_preferences: true,
        raw_scores: true,
        headers: {
          'accept-language': 'en',
          accept: 'application/json'
        }
      };

      personality_insights.profile(params, function(error, personalityProfile) {
        if (error && error.code == 400) {
          res.json({ error: error });
        } else {
          res.json({ rating: '', profile: personalityProfile });
        }
      });
    })
    .catch(err => res.json({ err: err }));
});

router.post('/analyze/amazon', authenticate, async (req, res) => {
  const asin = req.body.asin;

  const id = await Amazon.create({ asin }).then(persona => persona.id);

  var job = queue
    .create('amazon-queue', asin)
    .priority('high')
    .save(err => {
      if (err) {
        console.log('Job Failed');
        process.exit(0);
        return;
      }
      job.on('complete', async results => {
        console.log('Job Completed');
        const update = await Amazon.findByIdAndUpdate(id, {
          $set: { profile: results }
        });
        return update;
      });
      job.on('failed', error => {
        console.log('Failed: ', error);
        process.exit(0);
      });
    });

  queue.process('amazon-queue', async (job, done) => {
    let fetched_reviews = [];
    for (var i = 1; i < 6; i++) {
      let customer_reviews = [];
      for (var j = 1; j < 6; j++) {
        try {
          const stars = [
            0,
            'five_star',
            'four_star',
            'three_star',
            'two_star',
            'one_star'
          ];

          const review = await reviewsCrawler(asin, {
            page: `https://www.amazon.com/product-reviews/${
              job.data
            }/ref=cm_cr_getr_d_paging_btm_1?pageNumber=${j}&filterByStar=${
              stars[i]
            }`,
            elements: {
              productTitle: '.product-title',
              reviewBlock: '.review',
              link: 'a',
              title: '.review-title',
              rating: '.review-rating',
              ratingPattern: 'a-star-',
              text: '.review-text',
              author: '.review-byline a',
              date: '.review-date'
            },

            stopAtReviewId: false
          });

          await customer_reviews.push({
            reviews: review.reviews,
            rating: stars[i]
          });
        } catch (error) {
          await customer_reviews.push({});
        }
      }
      try {
        await fetched_reviews.push(customer_reviews);
      } catch (error) {
        await fetched_reviews.push({});
      }
    }

    const rearrange_data = await fetched_reviews.map(x => {
      return {
        rating: x.map(y => y.rating)[0],
        reviews: x
          .map(y => y.reviews)
          .reduce((prev, next) => prev.concat(next)),
        product: x.map(y => y.productTitle)[0]
      };
    });

    const phase = await rearrange_data.map(({ reviews, rating }) => {
      const textData = reviews.map(({ id, text, title }) => {
        return {
          id: id,
          language: 'en',
          contenttype: 'text/plain',
          content: text.replace('[^(\\x20-\\x7F)]*', ''),
          reply: false
        };
      });

      return { content: textData, rating };
    });

    const final = await phase.map((x, i) => {
      return new Promise((resolve, reject) => {
        const content = x.content;
        let params = {
          content_items: content,
          consumption_preferences: true,
          raw_scores: true,
          headers: {
            'accept-language': 'en',
            accept: 'application/json'
          }
        };

        personality_insights.profile(params, (error, personalityProfile) => {
          if (error && error.code == 400) {
            reject({ error: error });
          } else {
            resolve({ rating: x.rating, profile: personalityProfile });
          }
        });
      }).catch(err => console.log(err));
    });

    done(null, await Promise.all(final));
  });
  res.json({ id, message: 'working on your request' });
});

router.get('/analyze/amazon/results', authenticate, async (req, res) => {
  const id = req.query.id;

  const results = await Amazon.findById(req.query.id);

  res.send({
    message: 'still working!',
    results
  });
});

module.exports = router;
