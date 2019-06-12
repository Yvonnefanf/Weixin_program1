// pages/cloud/cloud.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },
  /*
  InsertData: function() {
    db.collection('user').add({
      data:{
        name: 'jack',
        age:20
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })*/
  InsertData: function () {
    db.collection('user').add({
      data: {
        name: 'jack',
        age: 10
      }
      }).then(res=>{console.log(res)}).catch(err=>{})

  },
  getfile:function() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res =>{
      db.collection('images').where({
        _openid: res.result.openid
      }).get().then(res2=>{
        console.log(res2)
        this.setData({
          images: res2.data
        })
      })
    })
  },
  upload:function () {
    //选择图片
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const temFilePaths = res.tempFilePaths
        console.log(temFilePaths)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png',
          filePath: temFilePaths[0],
          success: res =>{
            console.log(res.fileID)
            db.collection('images').add({
              data: {
                fileID: res.fileID
              }
            }).then(res =>{
              console.log(res);
            }).catch(err=>{
              console.error(err);
            })
          },
          fail: console.error
        })
      },
    })
  },
  downloadFile: function(event){
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid,
      success: res =>{
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: 'save success'
            })
          }
        })
      }

    })

  },
  bathDelete: function(){
    wx.cloud.callFunction({
      name: 'bachDelete'
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.error(err)
    })

  },
  Update: function(){
    db.collection('user').doc('6cd397ca5cf0f24d08de6ef8413ec802').update({
      data: {
        age:100
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  sum: function(){
    wx.cloud.callFunction({
      name:'sum',
      data: {
        a:2,
        b:3
      }
    }).then(res => {
      console.log(res)
    }).catch(err =>{
      console.log(err)
    })
  },
  getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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