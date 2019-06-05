const host = 'http://localhost:3000/'
//封装request
const apiRequest = (url, method, data, header) => {   
  let promise = new Promise(function (resolve, reject) {
    // debugger;
    wx.request({
      url: host + url,
      data: data ? data : null,
      method: method,
      header: header ? header : { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        let $request = JSON.parse(JSON.stringify(res.data))
        resolve($request);   
      },
      fail: function (res) {
        reject(res);
        // debugger;
      }
    })
  });
  return promise;  //注意，这里返回的是promise对象
}

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

<<<<<<< HEAD
let updateNote = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/updateNote', 'post', data))
  })
};

let removeNote = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/removeNote', 'post', data))
  })
};

let noteSearch = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/noteSearch', 'get', data))
  })
}

=======
// 我的->便签数量
let noteCount = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/getNoteCount', 'get', data))
  })
};

>>>>>>> 6d9ad176e050d5b777c2de39e10dec21e682eccd
export default{
  apiRequest: apiRequest,
  login:login,
  noteList:noteList,
<<<<<<< HEAD
  updateNote:updateNote,
  removeNote:removeNote,
  noteSearch:noteSearch
}
=======
  noteCount:noteCount
}
>>>>>>> 6d9ad176e050d5b777c2de39e10dec21e682eccd
