Component({
  data: {
    clicked: false,
    showProgress: false,
    progress: 0,
    buttonColor: '#8EC9C9'
  },
  methods: {
    onButtonClick: function () {
      const that = this;
      this.setData({ clicked: true });
    
      setTimeout(() => {
        this.setData({ showProgress: true });
    
        let progress = 0;
        const interval = setInterval(() => {
          progress += 8;
          that.setData({ progress });
    
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 50);
      }, 500); 
      setTimeout(function () {
        that.setData({ clicked: false });
         that.setData({ showProgress: false }); 
      }, 3000);
    },
  },
});
