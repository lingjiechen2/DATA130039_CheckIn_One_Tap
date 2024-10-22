// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    id : null,
    name : null
  },

  onLoad(options) {
    this.setData({
      id: app.globalData.id,
      name : app.globalData.name
    });
    console.log(this.name);
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  
  personalInfo(){
    console.log('用户点击了“个人信息”块');
  },
  myCourse(){
    console.log('用户点击了“我的课程”块');
  },
  Help(){
    console.log('用户点击了“帮助”块');
  },
  Setting(){
    console.log('用户点击了“设置”块');
  }
  
})