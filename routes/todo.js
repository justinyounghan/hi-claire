require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.put('/todo', authenticate, async (req, res) => {
  const id = mongoose.Types.ObjectId();
  const result = await User.findByIdAndUpdate(
    req.body.params.id,
    {
      $addToSet: {
        todos: { task_id: id, todo: req.body.params.todo, created: Date.now() }
      }
    },
    { new: true }
  );

  res.json(result.todos);
});

router.put('/remove_todo', authenticate, async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.params.id,
    {
      $pull: {
        todos: { task_id: mongoose.Types.ObjectId(req.body.params.task_id) }
      }
    },
    { new: true }
  );

  res.json(result.todos);
});

module.exports = router;
