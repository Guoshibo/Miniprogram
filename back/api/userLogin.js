const request = require('request');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
// 微信开发者ID
const APPID = 'wx74209dec4061abf1'
const SECRET = 'e349aaa9329491e608226dd1290aa01a'
//请求微信登录接口
exports.getWxUser = (req, res) => {
    let code = req.query.code
    //微信登录地址
    const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
    // 服务端发送请求
    request(URL, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            if (data.errcode) {
                //登录错误
                res.json(data)
            } else {
                //生成token
                const token = jwt.sign({
                        name: data.openid
                    },
                    "diary"
                )
                console.log(token);
                //微信id key
                let openid = {
                    'openid': data.openid
                }
                let session_key = {
                    'session_key': data.session_key
                }
                try {
                    //查询是否有此用户
                    let findRes = await userModel.findOne(openid)
                    if (findRes === null) {
                        const User = new userModel({
                            openid: data.openid,
                            session_key: data.session_key
                        })
                        await User.save()
                    } else {
                        await userModel.update(openid, session_key)
                    }
                    res.json({
                        code: 200,
                        message: '登录成功',
                        data: {
                            token: token,
                            openid:openid
                        }
                    })
                } catch (err) {
                    res.json({
                        code: -200,
                        data: err.toString()
                    })
                }
            }
        }
    })
}
