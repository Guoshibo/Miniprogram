// pages/index/index.js
const API = require('../../service/api.js').default;
const recorderManager = wx.getRecorderManager()
Page({
  data: {
    searchText: '',
    searchImg: '../../static/images/search.png',
    scrollHeight: '', //滚动高度
    msg: '',//语音内容`
    select: 1,//话筒动态绑定class
    orderList: [{
      createdTime: parseInt(Date.now() / 1000),
      content: "欢迎使用语音便签",
      _id: 0
    }]
  },

  todetails: function (e) {
    let content = e.currentTarget.dataset.content; //带参数
    let time = e.currentTarget.dataset.time;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'noteDetail/noteDetail?time=' + time + '&content=' + content + '&id=' + id,
    })
  },

  toedit:function(e){
    wx.navigateTo({
      url: 'edit/edit'
    })
  },

  // 按下按钮的时候触发
  startrecorderHandel() {
    // 录音按钮改变class
    this.setData({
      select: 0,
    })
    //录音配置
    const options = {
      duration: 60000,
    }
    // 开始录音
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误
    recorderManager.onError((res) => {
      console.log("error", res);
    });
  },
  // 松开按钮的时候触发-发送录音
  sendrecorderHandel() {
    // 录音按钮改变class
    this.setData({
      select: 1,
    })
    // 结束录音
    recorderManager.stop();
    recorderManager.onStop(res => {
      console.log('recorder stop')
      // tempFilePath 是录制的音频文件
      const { tempFilePath } = res;

      // 获取文件路径-提交到后台-后台发送到百度
      let token = wx.getStorageSync('TOKEN')
      // if (token) {
      //   wx.uploadFile({
      //     url: "https://api.xuewuzhijing.top/weChatApp/uploadFile",
      //     filePath: tempFilePath,
      //     name: "recorder",
      //     header: {
      //       "x-access-token": token,
      //     },
      //     success: res => {
      //       let $res = JSON.parse(res.data)
      //       if ($res.code == 200) {
      //         let result = $res.data.result
      //         this.data.orderList.unshift({
      //           _id: result._id,
      //           content: result.content,
      //           createdTime: result.createdTime
      //         })
      //         this.setData({
      //           orderList: this.data.orderList
      //         });
      //       } else if ($res.code === -200) {
      //         console.log(res)
      //         wx.showToast({
      //           title: '没有听清！',
      //           icon: 'none'
      //         })
      //       }
      //     },
      //     fail(err) {
      //       console.log(err);
      //     }
      //   });
      // }
    });
  },

  //input
  bindKeyInput(e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  //搜索
  search(e) {
    const data = {
      text: this.data.searchText
    }
    // API.noteSeach(data).then(res => {
    //   let $res = res.data
    //   this.setData({
    //     orderList: $res
    //   })
    //   // 清空搜索框
    //   this.setData({
    //     searchText: ''
    //   })
    // })
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    API.noteList().then(res => {
      const last = res.data.data;
      console.log(last);
      if (res.data.code == 200) {
        this.setData({
          orderList:last.result,
        });
        console.log(this.data.orderList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

