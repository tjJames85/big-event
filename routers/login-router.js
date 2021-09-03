const express = require('express')
const path = require('path')
const utility = require('utility')
const db = require(path.join(__dirname, '../common.js'))
const router = express.Router()

//注册接口
router.post('/reguser', async (req, res) => {

  //获取表数据
  var params = req.body
  //密码加密
  params.password = utility.md5(params.password)
  //判断数据是否重复
  let csql = 'select id from myuser where username=?'
  let flag = await db.operateData(csql, params.username)
  if (flag && flag.length > 0) {
    res.json({
      status: 1,
      message: '用户已经存在'
    })
    return
  }
  //把数据插入数据库
  let sql = 'insert into myuser set ?'
  let ret = await db.operateData(sql, params)
  //返回一个操作状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '注册成功'
    })
  } else {
    res.json({
      status: 1,
      message: '注册失败'
    })
  }
})

//登陆接口
router.post('/login', async (req, res) => {
  var params = req.body
  params.password = utility.md5(params.password)
  let sql = 'select id from myuser where username=? and password=?'
  let ret = await db.operateData(sql, [params.username, params.password])
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '登陆成功'
    })
  } else {
    res.json({
      status: 1,
      message: '登陆失败，用户名和密码错误'
    })
  }
})


module.exports = router