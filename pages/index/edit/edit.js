// pages/index/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: parseInt(Date.now() / 1000),
    content: '', //内容
    fixedContent: '',//存储内容
    iconType: [
      'success_no_circle'
    ],
    completeIcon: false,//编辑icon
    hidden: true, //模态框显示隐藏
  },

  focus(){
    this.setData({
      completeIcon: true,
    })
  },
  
  editNote() {
      this.setData({
        completeIcon: true,
      })
      let newContent = this.data.content
      let curentId = this.data.id
      wx.navigateBack({
        url:'../index/index'
      })
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