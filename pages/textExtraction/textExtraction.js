// pages/textExtraction/textExtraction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upImage: '../../static/images/identity2.png',//图片
    isPhoto: true,
    allInfo: [],//提取信息
    newList: [],
    allInfoString: '',//上面数组转成字符串
    isLoad: false,//加载转圈圈
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  previewImg() {
    let token = wx.getStorageSync('TOKEN')
    if (token) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album','camera'],
        success: res => {
          const tempFilePaths = res.tempFilePaths
          this.setData({
            upImage: tempFilePaths[0],
            isPhoto: false,
            allInfo: [],
          })
          console.log("上传图片成功");
          return tempFilePaths;
        }
      })
    } else {
      console.log('error');
    }
  },
  up(){
    this.upImg(this.data.upImage);
    console.log("up函数执行成功");
  },
  upImg(imgFile) {
    this.setData({
      isLoad: true,
    })
    let token = wx.getStorageSync('TOKEN')
    let _this = this
    const uploadTask = wx.uploadFile({
      url: 'https://guo.vhl1996.top/weChatApp/upImgFile',
      filePath: imgFile,
      name: 'imgfile',
      header: {
        "x-access-token": token
      },
      success: function (res) {
        let $res = JSON.parse(res.data);
        console.log($res.data)
        if ($res.code == 200) {
          _this.setData({
            isLoad: false,
            allInfo: $res.data,
          })
          $res.data.map(item => {
            _this.data.newList.push(item.words)
          })
          let a = _this.data.newList
          _this.setData({
            allInfoString: a.toString()
          })
        }
        if ($res.code == -200) {
          wx.showToast({
            title: '没有识别出文字哦！',
            icon: 'none',
          })
          _this.setData({
            isLoad: false,
          })
        }
      }
    })
  },
  // 复制文本
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none',
            })
          }
        })
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