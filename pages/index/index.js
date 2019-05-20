// pages/index/index.js
const recorderManager = wx.getRecorderManager()
Page({
  data: {
    searchText: '',
    searchImg: 'http://img.xuewuzhijing.top/search.svg',
    scrollHeight: '', //滚动高度
    msg: '',//语音内容
    select: 1,//话筒动态绑定class
    orderList: [{
      createdTime: parseInt(Date.now() / 1000),
      content: "欢迎使用语音便签",
      _id: 0
    },
    {
      createdTime: parseInt(Date.now() / 1000),
      content: "按下语音-----------------------------------------------记录一切^_^",
      _id: 1
    }]
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

