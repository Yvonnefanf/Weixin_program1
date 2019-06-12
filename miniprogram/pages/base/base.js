// pages/base/base.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },
  onTapHandler: function(){
    this.setData({
      number: this.data.number+1
    })
  },

  getmovieList: function() {
    wx.showLoading({
      title: 'loading',
    })
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  gotoComment: function(event) {
    wx.navigateTo({
      url: `../comments/comments?movieid=${event.target.dataset.movieid}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmovieList()
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
    this.getmovieList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})