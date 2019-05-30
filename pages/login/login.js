// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo() {//同意授权，获取用户信息，encryptedData是加密字符串，里面包含unionid和openid信息
    wx.getUserInfo({
      withCredentials: true,//此处设为true，才会返回encryptedData等敏感信息
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        // app.globalData.userInfo = res.userInfo;
        // app.globalData.encryptedData = res.encryptedData;
        // app.globalData.iv = res.iv;
        // this.saveUserInfo();
        console.log(res)
      }
    })
    wx.reLaunch({
      url: '../index/index',
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