// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    id: null,
    name : null,
    identity: null,
    path: 'http://127.0.0.1:5000',
    loginStatus: false ,// false means student
    department: null,
    email: null,
    phone: null
    //path: '10.219.248.8:5000'
    //path: '10.219.248.8:5000'
  }
})

  
  // 设置更多的tab...
