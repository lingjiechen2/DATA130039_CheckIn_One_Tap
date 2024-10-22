Component({
  data: {
    selected: 0,
    color: "#000000",
    roleId: '',
    selectedColor: "#1396DB",
    allList: [{


      list1: [
        {
        "pagePath": "pages/studenthomepage/studenthomepage",
        "text": "首页",
        "iconPath": "icon/首页1.png",
        "selectedIconPath": "icon/首页2.png"}
        ,{
        "pagePath": "pages/function/function",
        "text": "功能",
        "iconPath": "icon/功能1.png",
        "selectedIconPath": "icon/功能2.png"
      }, {
        
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "icon/我的1.png",
        "selectedIconPath": "icon/我的2.png"
      }],


      list2: [{
        "pagePath": "pages/teacherhomepage/teacherhomepage",
        "text": "首页",
        "iconPath": "icon/首页1.png",
        "selectedIconPath": "icon/首页2.png"
      }, {
        "pagePath": "pages/function/function",
        "text": "功能",
        "iconPath": "icon/功能1.png",
        "selectedIconPath": "icon/功能2.png"
      },{
        
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "icon/我的1.png",
        "selectedIconPath": "icon/我的2.png"
      } ]     
    }],
    list: []
  },
  attached() {
    const roleId = wx.getStorageSync('statu')
    if (roleId == 100) {
      this.setData({
        list: this.data.allList[0].list1
      })
    }else if(roleId==200){
      this.setData({
        list: this.data.allList[0].list2
      })
    }
    
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('/'+url);
      wx.switchTab({
        url: '/' + url
      })
      this.setData({
        selected: data.index
      })
      console.log(data.index);
    }
  },



})


