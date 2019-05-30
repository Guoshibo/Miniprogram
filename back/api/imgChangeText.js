const Promise = require('bluebird')
const multiparty = require('multiparty')
const AipOcrClient = require("baidu-aip-sdk").ocr
const textExtractModel = require('../models/textExtract')
const fs = require('fs');

//multiArgs: true 数组的形式返回 [多个值,,]
Promise.promisifyAll(multiparty, {
	multiArgs: true
})

exports.upImgFile = async (req, res) => {
	console.log("img5555")
	
	//生成multiparty对象，并配置上传目标路径
	const form = new multiparty.Form({
		uploadDir: './api/file/imgChangeText/'
	});

	try {

		//解析文件
		const files = await form.parseAsync(req)

		//文件存储路径
		let filePath = files[1].imgfile[0].path

		//百度AI文字识别
		let baiduRes = await baiduAI(filePath)

		//图片上是否有文字
		if (baiduRes.words_result_num === 0 && baiduRes.words_result.length === 0) {

			//图片上没有文字
			res.json({
				code: -200,
				data: "图片无文字"
			})
		} else {
			//返回文字成功

			//id
			let openId = req.decoded.name

			// 存库
			const textExtract = new textExtractModel({
				openId: openId,
				text: baiduRes.words_result,
				createdTime: parseInt(Date.now() / 1000)
			})
			let result = await textExtract.save()

			//返回结果
			res.json({
				code: 200,
				data: result.text
			})
		}

	} catch (err) {
		res.json({
			code: -200,
			err: err
		})
	}
}

//百度AI识别本地图片->返回文字
function baiduAI(imgPath) {
	return new Promise((resolve, reject) => {

		// 百度id Key SecretKey
		const APP_ID = "15981584";
		const API_KEY = "X9LE3pz9TPHDFGur4yGg0T2G";
		const SECRET_KEY = "AAMxWvGWb7kE3YhhrOS03pzK3VrGbmE7";
		const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

		// 如果有可选参数
		var options = {};
		options["language_type"] = "CHN_ENG"; //识别语言类型：中-英
		options["detect_direction"] = "true";
		options["detect_language"] = "true";
		// options["probability"] = "true";

		//转成base64
		let image = fs.readFileSync(imgPath).toString("base64");

		// 带参数调用通用文字识别, 图片参数为本地图片
		client.generalBasic(image, options).then(function (result) {

			// 成功识别
			resolve(result)
		}).catch(function (err) {

			// 如果发生网络错误
			reject(err)
		});
	})
}