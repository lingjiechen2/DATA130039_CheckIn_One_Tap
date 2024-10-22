// pages/login/login.js
const app = getApp();

Page({
  data: {
  },
  formSubmit: function (e) {
    let {ID, password} = e.detail.value;

    wx.request({
      //url: 'http://127.0.0.1:5000/login',
      url: app.globalData.path + '/login',
      data: {id: ID, password: password},
      header: {'content-type': 'application/json'},
      method: 'POST',

      success: (res) => {
        let {identity, name,status} = res.data;

        if (status == 'success') {
          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 1000
          });
          app.globalData.identity = identity;
          app.globalData.name = name;
          // console.log(name)

          if (identity == 'student') {
            wx.redirectTo({
              url: '/pages/studenthomepage/studenthomepage',
            })
          } else {
            wx.redirectTo({
              url: '/pages/teacherhomepage/teacherhomepage',
            });
          };

          // 将用户的学工号和身份存储到全局数据中
          app.globalData.id = ID;
          
        } 
        else {
          wx.showToast({
            title: '认证失败',
            icon: 'error',
            duration: 1000
          })
        }
      }
    })
  },

  onLoad() {
    // 可以在这里获取用户的openid，然后在数据库中搜索，如果搜索到已经存在的用户，就自动填入学工号和密码
    wx.login({
      success: (res) =>{
        if (res.code) {
          wx.request({
            // url: 'http://127.0.0.1:5000/wxLogin',
            url: app.globalData.path + '/wxLogin',
            data: {code: res.code},
            header: {'content-type': 'application/json'},
            method: 'POST',
          })
        }
      }
    })
  },
})