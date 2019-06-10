// pages/index/noteDetail/noteDetail.js
const API = require('../../../service/api.js').default;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '',//时间
    content: '', //内容
    fixedContent: '',//存储内容
    iconType: [
      'success_no_circle'
    ],
    noteIcon: true, //便签icon
    completeIcon: false,//编辑icon
    hidden: true, //模态框显示隐藏
    disabled: false //是否禁用输入
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //上个页面带过来的参数
      time: options.time,
      content: options.content,
      fixedContent: options.content,
      id: options.id
    })
  },
  // 获取修改的内容
  valueChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 更新编辑获取焦点
  upFocus() {
    this.setData({
      noteIcon: false,
      completeIcon: true,
    })
    this.setData({
      fixedContent: this.data.content
    })
  },
  updateNote() {
    if (this.data.fixedContent == this.data.content) {
      console.log("没有任何改动")
      wx.navigateBack({
        url: '../index/index',
      })
    } else {
      this.setData({
        noteIcon: true,
        completeIcon: false,
      })
      let newContent = this.data.content
      let curentId = this.data.id
      console.log(newContent,curentId);
      const data = {
        id: curentId,
        content: newContent
      }
      API.updateNote(data).then(res => {
        if(res.code == 200){
          wx.reLaunch({
            url: '../index',
          })
        }
      })
    }
  },
  //删除
  openConfirm:function(){
    let that = this;
    wx.showModal({
      title: '删除',
      content: '是否要删除？',
      confirmText: "确认",
      cancelText: "取消",
      success: res => {
        if (res.confirm) {
          let curentId = that.data.id;
          const data = {
            id:curentId
          }
          API.removeNote(data).then(res => {
            if (res.code == 200) {
              wx.reLaunch({
                url: '../index',
              })
            }
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
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