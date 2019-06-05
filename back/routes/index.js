var express = require('express');
var router = express.Router();
var userApi = require('../api/userLogin.js')
var recorderApi = require('../api/uploadFile.js')
var upImgFileApi = require('../api/imgChangeText.js')

//登录
router.get('/login',userApi.getWxUser)
//上传文件->语音
router.post('/uploadFile',recorderApi.uploadRecorder)
//便签列表
router.get('/noteList',recorderApi.noteList);
//删除便签
router.post('/removeNote',recorderApi.removeNote)
//编辑便签
router.post('/updateNote',recorderApi.updateNote)
//便签总条数
router.get('/getNoteCount',recorderApi.getNoteCount)
//拍照上传图片识别文字
router.post('/upImgFile',upImgFileApi.upImgFile)
//搜索
router.get('/noteSearch',recorderApi.noteSearch)



module.exports = router
