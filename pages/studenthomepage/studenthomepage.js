// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    // 签到信息数据属性
    isCheckAvailable: true,
    course: null,
    course_id:null,
    task:null,
    location: null,
    startTime: null,
    endTime: null,
    status: null,
    signTime: null
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    console.log("签到成功")
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
    this.checkTime();
    // this.setData({
    //   'tabBar.selected': 0
    // })

  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

  },

//selected: 0就是选中的tabbar下标，根据不同页面显示不同tabbar下标


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // onShow: function() {
  //   // 设置定时器，每隔一段时间执行检测操作
  //   setInterval(() => {
  //     this.checkTime();
  //   }, 5000); // 每秒检测一次
  // },

  checkTime: function() {
    // 获取当前时间
    const currentTime = new Date();
    wx.request({
      url: app.globalData.path + '/student/courseregis',
      data: {id: app.globalData.id, day:currentTime.getDay(), hour:currentTime.getHours(), minute: currentTime.getMinutes()},
      header: {'content-type': 'application/json'},
      method: 'POST',

      success: (res) => {
        let {next_course_id,next_course_name,next_course_location,status} = res.data;
        if (status == 'success') {
          this.setData({
            course:next_course_name,
            course_id:next_course_id,
            location: next_course_location
            });
        // console.log(currentTime);
        wx.request({
        url: app.globalData.path + '/student/checkcourse',
        data: {course_id: next_course_id, day:currentTime.getDate(), month:(currentTime.getMonth()+1)},
        header: {'content-type': 'application/json'},
        method: 'POST',

        success: (res) => {
          let {start_time,end_time,status} = res.data;
          console.log(start_time,end_time);
          if (status == 'success') {
            this.setData({
              isCheckAvailable: true,
              task:"Check in",
              startTime: start_time,
              endTime: end_time,
              status: "haven't checked in",
              signTime: "haven't checked in"
              })
            }else{
              this.setData({
                isCheckAvailable: false,
                
              });
              console.log("No check")
            };
          }
        })
          }else{
            this.setData({
              course:null,
              isCheckAvailable: false
            })
          };
        }
      })
      // 在找到了最近的课程之后，我们需要检查最近的一门课是不是被设定了签到任务，
      // 这个检查方式我们将课程与时间传入url中，让其进行检查
      
    // 判断是否在特定时间段
  },

  CheckSubmit: function (e) {
     if (!this.data.isCheckAvailable){
       console.log("当前无签到任务")
       return;
     }else{
         let ID = app.globalData.id;
         const currentTime = new Date();
         var year = currentTime.getFullYear();
        var month = currentTime.getMonth() + 1; // getMonth() is zero-indexed, so we add one
        var day = currentTime.getDate();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        let TimeStamp = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      wx.request({
        // url: 'http://127.0.0.1:5000/student/checkin',
        url: app.globalData.path + '/student/checkin',
        data: {id: ID, course_id: this.data.course_id,time:TimeStamp},
        header: {'content-type': 'application/json'},
        method: 'POST',

        success: (res) => {
          let {time,status} = res.data;
          console.log(`successfully checked in at ${time}`);
          if (status == 'success') {
            this.setData({
              isCheckAvailable: true,
              task:"Check in",
              // startTime: start_time,
              // endTime: end_time,
              status: "checked in!",
              signTime: time
              });
              wx.showToast({
                title: '签到成功', // 提示的文本内容
                icon: 'success', // 提示的图标，可选值：'success'（成功）、'loading'（加载中）、'none'（无图标）
                duration: 2000, // 提示的延迟时间，单位为毫秒，默认值为 1500
                mask: true, // 是否显示透明蒙层，防止触摸穿透，默认值为 false
              });
            }else{
              this.setData({
                // isCheckAvailable: false;
              })
            };
          }
        
    })
     }
    
  }
})
