const Promise = require('bluebird')
const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const RecorderModel = require('../models/recorder')

//multiArgs: true 数组的形式返回 [多个值,,]
Promise.promisifyAll(multiparty, {multiArgs: true})

// 文件上传-- 语音文件
exports.uploadRecorder = async (req, res) => {
    console.log('录音')

    try {

        //生成multiparty对象，并配置上传目标路径
        const form = new multiparty.Form({
            uploadDir: './api/file/recorder/'
        });

        //解析文件
        const files = await form.parseAsync(req)

        //文件存储路径
        let filePath = files[1].recorder[0].path

        //转换语音格式 wav
        let wavPath = await getWav(filePath)

        //百度AI语音识别
        let baiduRes = await baiduAI(wavPath)

        //id
        let openId = req.decoded.name
        // let findRes = await Recorder.findOne({openId:openId})

        // 存库
        const Recorder = new RecorderModel({
            openId: openId,
            content: baiduRes.result[0],
            createdTime: parseInt(Date.now() / 1000)
        })
        let result = await Recorder.save()

        //返回结果
        res.json({
            code: 200,
            data: {
                result: {
                    _id: result._id,
                    content: result.content,
                    createdTime: result.createdTime
                }
            }
        })

    } catch (err) {

        //报错返回
        res.json({
            code: -200,
            err: err
        })
    }
}


//音频格式转换
function getWav(filePath) {
    return new Promise((resolve, reject) => {
        let wavPath = `${filePath.slice(0, -4)}.wav`
        ffmpeg(filePath)
            .save(wavPath)
            .on('end', function () {
                resolve(wavPath)
            })
            .on('error', function (err) {
                console.log('an error happened: ' + err.message);
                reject(err)
            })
    })
}

//百度AI识别本地语音文件
function baiduAI(wavPath) {
    return new Promise((resolve, reject) => {

        // 百度id Key SecretKey
        const ApiId = '15836284'
        const ApiKey = 'UyKarQWMrQVsTeAVjy6vvhUr';
        const SecretKey = 'yrCNBBKFadHNLYOrrD8G7GrPYtBmLGrY';
        let client = new AipSpeech(0, ApiKey, SecretKey);

        //读取文件
        let voice = fs.readFileSync(wavPath);
        let voiceBase64 = new Buffer(voice);

        // 识别本地语音文件
        client.recognize(voiceBase64, 'wav', 16000).then(function (result) {
            if (result.err_no == 0) {

                //成功识别
                resolve(result)
            } else {

                //识别失败
                reject(result)
            }
        }, function (err) {
            reject(err)
        });
    })
}

//获取所有便签-- /noteList
exports.noteList = async (req, res) => {
    console.log('查询所有记录')
    let openId = req.body.openId;
    let findRes = await RecorderModel.find({openId: openId}, {_id: 1, content: 1, createdTime: 1})
    res.json({
        code: 200,
        data: {
            result: findRes
        }
    })
}
//删除
exports.removeNote = async (req, res) => {
    const {id} = req.body

    try {
        await RecorderModel.findByIdAndDelete({_id: id})
        res.json({
            code: 200,
            data: {
                msg: "成功"
            }
        })
    } catch (err) {
        res.json({
            code: -200,
            err: err
        })
    }
}

//编辑
exports.editNote = async (req, res) => {
    const {id, content} = req.body

    try {
        await RecorderModel.updateOne({'_id': id}, {'content': content})
        res.json({
            code: 200,
            data: {
                msg: "成功"
            }
        })
    } catch (err) {
        res.json({
            code: -200,
            err: err
        })
    }
}

//便签总条数
exports.getNoteCount = async (req, res) => {
    let openId = req.decoded.name

    try {
        let result = await RecorderModel.count({openId: openId})
        res.json({
            code: 200,
            data: {
                result: result
            }
        })
    } catch (err) {
        res.json({
            code: -200,
            err: err
        })
    }
}

//模糊查询
exports.noteSearch = async (req, res) => {
    let openId = req.decoded.name
    let text = req.query.text
    const reg = new RegExp(text, 'i')

    try {
        let result = await RecorderModel.find({openId: openId, content: reg}, {openId: 0})
        res.json({
            code: 200,
            data: result
        })
    } catch (err) {
        res.json({
            code: -200,
            err: err
        })
    }
}