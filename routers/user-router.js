const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname, '../common'))

//获取用户信息
router.get('/userinfo', async (req, res) => {
  let id = req.user.id
  let sql = 'Select id,username,nickname,email,user_pic from myuser where id=?'
  let ret = await db.operateData(sql, id)
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '获取数据成功',
      data: ret[0]
    })
  } else {
    res.json({
      status: 1,
      message: '获取用户信息失败'
    })
  }



})


module.exports = router