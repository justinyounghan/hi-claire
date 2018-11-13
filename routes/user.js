require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');
const { validateInput, validateForm } = require('../middlewares/validation');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/users', authenticate, (req, res) => {
  User.find({})
    .then(users => {
      res.send(users.summary());
    })
    .catch(err => res.json({ err }));
});

router.get('/currentuser', authenticate, (req, res) => {
  User.findById(req.userId, { password: 0 })
    .then(user => {
      return res.send(user.summary());
    })
    .catch(err => res.json({ err }));
});

router.post('/register', (req, res) => {
  const { err, valid } = validateInput(req.body);

  if (valid) {
    User.findOne({ email: valid.email })
      .then(user => {
        if (user) {
          return res.json({ err: 'User has already been registered' });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({ email: valid.email, password: hashedPassword })
          .then(user => {
            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
              expiresIn: 86400
            });

            return res.json({
              token,
              auth: true,
              id: user.id,
              email: user.email,
              todos: user.todos
            });
          })
          .catch(err => res.json({ error: err }));
      })
      .catch(err => res.json({ error: err }));
  } else {
    return res.json({ auth: false, err });
  }
});

router.post('/login', (req, res) => {
  const { err, valid } = validateInput(req.body);

  if (valid) {
    User.findOne({ email: valid.email })
      .then(user => {
        if (!user) {
          return res.status(401).send('User not found');
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.json({
            auth: false,
            token: null,
            err: { failed: 'Incorrect Email and Password combination' }
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400
        });

        res.json({
          token,
          auth: true,
          id: user.id,
          email: user.email,
          todos: user.todos
        });
      })
      .catch(err => res.send(err));
  } else {
    return res.json({ auth: false, err });
  }
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
