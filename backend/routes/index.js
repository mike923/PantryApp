const express = require('express');
const router = express.Router();

let authorized = false
const checkAuth = (req, res, next) => {
  if (authorized) {
    next()
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}


/* GET home page. */
router.use('/', checkAuth)

router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome to Pantry Backend' });
});

module.exports = router;
