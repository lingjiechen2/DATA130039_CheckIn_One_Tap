// pages/setsignininfo/setsigninfo.js
const app = getApp();

Page({
  data: {
    show: false,
    courses: ['数据库及实现', '神经网络与深度学习', '自然语言处理'],
    course_ids: null,
    course_index: 0,
    days:null,
    day_index: 0,
    start_times: null,
    start_time_index: 0,
    end_times: null,
    end_time_index: 0,
    message: null,
    longitude: 121.52609,
    latitude: 31.25956,
    previous_button_style: "previous-button-clicked",
    new_button_style: "new-button",
    map: null,
    markers: [{
      id: 1,
      latitude: 31.25956,
      longitude: 121.52609,
      width: 24,
      height: 24,
    }]
  },

  // 当老师选择其他课程时，这个函数会被调用，改变index的值，从而改变显示的课程名
  CoursePicker(e) {
    this.setData({
      course_index: e.detail.value
    });

    // 将老师选择的课程传到后端，后端通过该课程查询该课程上课的时间信息，然后根据这些信息生成签到的开始和结束时间。
    // this.data.course_ids[this.data.index]
    wx.request({
      url: app.globalData.path + '/teacher/query/days',
      data: {
        course_id: this.data.course_ids[this.data.course_index],
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success: (res) => {
        let {days, latitude, longitude, start_times, end_times} = res.data;
        this.setData({
          days: days,
        });
        if (latitude !== null) {
          this.setData({
            latitude: latitude,
            longitude: longitude,
            start_times: start_times,
            end_times: end_times,
            markers: [{
              id: 1,
              latitude: latitude,
              longitude: longitude,
              width: 24,
              height: 24,
            }]
          });
        }
      },
    })
  },

  DayPicker(e) {
    this.setData({
      day_index: e.detail.value,
    }),

    wx.request({
      url: app.globalData.path + '/teacher/query/times/start',
      data: {
        course_id: this.data.course_ids[this.data.course_index],
        day: this.data.days[this.data.day_index],
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success: (res) => {
        let {start_times, end_times} = res.data;
        this.setData({
          start_times: start_times,
          end_times: end_times,
        });
      },
    })
    
  },

  StartTimePicker(e) {
    this.setData({
      start_time_index: e.detail.value,
    });

    wx.request({
      url: app.globalData.path + '/teacher/query/times/end',
      data: {
        day: this.data.days[this.data.day_index],
        start_time: this.data.start_times[this.data.start_time_index],
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',


      success: (res)=> {
        console.log(res.data);
        this.setData ({
          end_times: res.data,
        })
      }
    })
  },

  EndTimePicker(e) {
    this.setData ({
      end_time_index: e.detail.value,
    })
  },

  onLoad(options) {
    // 通过老师的工号获取老师教授的课程
    let ID = app.globalData.id;
    console.log(ID);
    wx.request({
      // url: 'http://127.0.0.1:5000/teacher/query/courses',
      url: app.globalData.path + '/teacher/query/courses',
      data: {
        id: ID,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success: (res) => {
        let {course_infos, days, start_times, end_times, latitude, longitude} = res.data;
        let course_names = new Array(course_infos.length).fill('');
        let course_ids = new Array(course_infos.length).fill('');

        for (var i = 0; i< course_infos.length; i++) {
          course_names[i] = course_infos[i].name;
          course_ids[i] = course_infos[i].id;
        }
        this.setData ({
          courses: course_names,
          course_ids: course_ids,
          days: days,
          start_times: start_times,
          end_times: end_times,
          latitude: latitude,
          longitude: longitude,
          markers: [{
            id: 1,
            latitude: latitude,
            longitude: longitude,
          }]
        });
      },
    });

    // 设置地图栏的初始位置
    this.data.map = wx.createMapContext('myMap');
  },

  choosePreviousLocation: function() {
    this.setData({
      previous_button_style: "previous-button-clicked",
      new_button_style: "new-button",
    });
  },

  chooseNewLocation: function() {
    // 更改button的颜色
    this.setData({
      previous_button_style: "previous-button",
      new_button_style: "new-button-clicked",
    });

    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
          }]
        });
      },
      fail: function(err) {
        console.error(err);
      }
    });
  },

  setsignin() {
    wx.request({
      url: app.globalData.path + '/teacher/store/checkin',
      data: {
        course_id: this.data.course_ids[this.data.course_index],
        teacher_id: app.globalData.id,
        day: this.data.days[this.data.day_index],
        start_time: this.data.start_times[this.data.start_time_index],
        end_time: this.data.end_times[this.data.end_time_index],
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success: function(res) {
        console.log(res.data);
      },
    }),


    wx.reLaunch({
      url: '/pages/teacherhomepage/teacherhomepage',
    })
  },

})