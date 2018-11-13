require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failure to authenticate' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'Huh?' });
  }
};
