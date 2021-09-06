const express = require('express')
const router = express.Router()
const utility = require('utility')
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

//修改密码
router.post('/updatepwd', async (req, res) => {
  //获取参数
  let id = req.user.id
  let params = req.body
  params.oldPwd = utility.md5(params.oldPwd)
  params.newPwd = utility.md5(params.newPwd)
  //操作数据库
  let sql = 'update myuser set password=? where id=? and password=?'
  let ret = await db.operateData(sql, [params.newPwd, id, params.oldPwd])
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '重置密码成功'
    })
  } else {
    res.json({
      status: 1,
      message: "重置密码失败"
    })
  }
})

//上传头像
router.post('/update/avatar', async (req, res) => {
  //获取信息
  let id = req.user.id
  let params = req.body
  //操作数据库
  let sql = 'update myuser set user_pic=? where id=?'
  let ret = await db.operateData(sql, [params.avatar, id])
  //响应状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '上传头像成功'
    })
  } else {
    res.json({
      status: 1,
      message: '上传头像失败'
    })
  }

})

module.exports = router