const API = require('../../service/api').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 登录
  login() {
    wx.login({
      success: res => {
        console.log(res.code);
        const data = {
          code: res.code,
        }
        API.login(data).then(res=>{
          console.log(res);
          if (res.data.code == 200) {
            const token = res.data.data;
            wx.setStorage({
              key: 'TOKEN',
              data: token.token
            })
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }

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