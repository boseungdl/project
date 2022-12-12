const express = require("express");
//const controller = require("../controller/Cstore");
const router = express.Router();

router.get('/login', (req, res) => {
  console.log(req.user)
  res.render('login')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/main', (req, res) => {
  res.render('main')
})


module.exports = router;