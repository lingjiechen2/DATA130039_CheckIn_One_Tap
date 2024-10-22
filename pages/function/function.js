// pages/message/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      'tabBar.selected': 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onBlockTap: function (event) {
    var type = event.currentTarget.dataset.type;
    if (type === 'attend') {
      // 用户点击了“签到记录”块
      console.log('用户点击了“签到记录”块');
    } else if (type === 'leave') {
      // 用户点击了“请假申请”块
      console.log('用户点击了“请假申请”块');
    } else if (type === 'message') {
      // 用户点击了“消息与提醒”块
      console.log('用户点击了“消息与提醒”块');
    }
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

  },

//selected: 0就是选中的tabbar下标，根据不同页面显示不同tabbar下标



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})