// pages/teacherhomepage/teacherhomepage.js
const app = getApp()

Page({
  data: {
    isLogin:false,
    tabBarList: [
      {
        "pagePath": "pages/teacherhomepage/teacherhomepage",
        "text": "首页",
        "iconPath": "icon/首页1.png",
        "selectedIconPath": "icon/首页2.png"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "icon/消息1.png",
        "selectedIconPath": "icon/消息2.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "icon/我的1.png",
        "selectedIconPath": "icon/我的2.png"
      }
    ],
    checkin: {
      course_id: null,
      course_name: null,
      day: null,
      start_time: null,
      end_time: null,
      latitude: null,
      longitude: null,
      isCheckAvailable: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let ID = app.globalData.id;
    let that = this;
    wx.request({
      url: app.globalData.path + '/teacher/query/checkin',
      data: {
        teacher_id: ID,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success: function(res) {
        console.log(res.data);
        let {status,info} = res.data
        if (status === 'success'){ that.setData({
          checkin: info,
          isCheckAvailable: true,
        })
      }else{
        that.setData({
          course_id: null,
          course_name: null,
          day: null,
          start_time: null,
          end_time: null,
          latitude: null,
          longitude: null,
          isCheckAvailable: false,
          isCheckAvailable:false,
        })
        
      }
       
      }
    })
  },
  
  setinfo() {
    wx.navigateTo({
      url: '/pages/setsignininfo/setsigninfo',
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(typeof this.getTabBar);
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
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