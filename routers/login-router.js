const express = require('express')
const router = express.Router()
router.get('/test', (req, res) => {
  res.send("test")
})
router.get('/abc', (req, res) => {
  res.send("abc")
})
module.exports = router