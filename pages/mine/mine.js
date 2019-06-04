const API  = require('../../service/api').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'', 
  },
  // 直接调用微信小程序的接口navigateTo控制界面跳转
  jumpPage:function(){
    wx.navigateTo({
      url:'/pages/description/description',
    })
  },
  jump:function(){
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login() {
    let _this = this
    wx.login({
      success(res) {
        if (res.code) {
          const data = {
            code: res.code,
          }
          API.login(data).then((res) => {
            if (res.code == 200) {
              //存入缓存token
              wx.setStorage({
                key: 'TOKEN',
                data: res.data.token,
              })

            }
          })
        }
      }
    })

  },
  //我的笔记条数
  mynote() {
    API.noteCount().then(res => {
      if (res.code == 200) {
        this.setData({
          result: res.data.result
        })
        console.log(this.data.result)
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
    this.login()
    this.mynote()
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