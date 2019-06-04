const host = 'http://localhost:3000/'
//封装request
const apiRequest = (url, method, data, header) => {     //接收所需要的参数，如果不够还可以自己自定义参数
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: data ? data : null,
      method: method,
      header: header ? header : { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //接口调用成功
        resolve(res);    //根据业务需要resolve接口返回的json的数据
      },
      fail: function (res) {
        // fail调用接口失败
        reject({ errormsg: '网络错误,请稍后重试', code: -1 });
      }
    })
  });
  return promise;  //注意，这里返回的是promise对象
}

//登录接口的调用
let login = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/login', 'get', data))
  })
};


let noteList = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/noteList', 'get', data))
  })
};

// 我的->便签数量
let noteCount = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/getNoteCount', 'get', data))
  })
};

export default{
  login:login,
  noteList:noteList,
  noteCount:noteCount
}
