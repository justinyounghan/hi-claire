require('dotenv').config();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const fetchTweets = username => {
  return new Promise((resolve, reject) => {
    let params = {
      screen_name: username,
      count: 200,
      include_rts: true,
      trim_user: true,
      exclude_replies: false,
      tweet_mode: 'extended'
    };

    let tweets = [];

    const fetchTweets = (error, newTweets) => {
      if (error) {
        reject(Error(error));
      }

      if (newTweets.length >= 1) {
        const filteredTweets = newTweets.map(function(tweet) {
          return {
            id: tweet.id_str,
            language: tweet.lang,
            contenttype: 'text/plain',
            content: tweet.full_text.replace('[^(\\x20-\\x7F)]*', ''),
            reply: tweet.in_reply_to_screen_name != null
          };
        });

        resolve(filteredTweets);
      } else {
        reject(Error(error));
      }
    };
    client.get('statuses/user_timeline', params, fetchTweets);
  });
};

module.exports = fetchTweets;
