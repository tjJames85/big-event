const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../common.js'))
const router = express.Router()
router.get('/test', async (req, res) => {
  console.log('test');
  let sql = 'select * from myuser'
  let ret = await db.operateData(sql, null)
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '查询数据成功',
      data: ret
    })
  } else {
    res.json({
      status: 1,
      message: '查询数据失败'
    })
  }

})

module.exports = router