const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome to Pantry Backend' });
});

router.post('/', (req, res, next) => {
  console.log(Array(100).fill('@').join(''))
  console.log(req)
  console.log(Array(100).fill('@').join(''))
  console.log(req.headers)
  res.json({
    title: 'hello this is a post req',
    user: req.user_id,
    data: req.body,

  })
})

module.exports = router;
