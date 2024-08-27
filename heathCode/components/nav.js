// components/nav.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    unfinished(){
      wx.showToast({
        title: '功能未开放，尽情期待',
        icon:"none"
      })
    },
    scanCode(){
      wx.scanCode({
        success (res) {
          app.myrequest({
            url:'http://graywolf.top:6201/place-code/scanCode',
            method:'POST',
            data:{
              pid:0
            },
            success:(data=>{
              if(data.data.code==200)
              wx.showToast({
                title: '场所码扫描成功',
                icon:'none'
              })
            })
          })
        },
      })
    },
    goto(event){
      const page = event.currentTarget.dataset.page;
      wx.navigateTo({
        url: '/pages/'+page+'/'+page,
      })
    },
  }
})