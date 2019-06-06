const host = 'https://guo.vhl1996.top/'
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

let noteCount = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/getNoteCount', 'get', data))
  })
};

let addNote = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest('weChatApp/addNote', 'post', data))
  })
};

export default{
  apiRequest: apiRequest,
  login:login,
  noteList:noteList,
  updateNote:updateNote,
  removeNote:removeNote,
  noteSearch:noteSearch,
  noteCount: noteCount,
  addNote:addNote
}
