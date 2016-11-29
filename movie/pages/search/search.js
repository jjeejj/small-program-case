// pages/search/search.js
var subjectUtils = require('../../utils/subjectsUtils.js'); //引入处理电影内容的工具js
Page({
  data:{
    inputValue:"",//搜索关键词
    movies:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //输入框改变是执行的方法
  bindKeyOnput:function(event){
    // console.log('event',event)
    var inputValue = event.detail.value;
    this.setData({
      inputValue:inputValue
    })
  },
  //查询电影功能
  search:function(){
    var page = this;
    var inputValue = this.data.inputValue;
    if(inputValue==""){
      wx.showModal({
          title: '小提示',
          showCancel:false,
          confirmText:'知道啦',
          content: '请输入需要查询的关键词',
          success: function(res) {
            if (res.confirm) {
              return false;
            }
        }
    })
    }
    //显示加载中的提示
     wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration:10000
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/search?q='+ inputValue,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-type': 'json'  //此处不知道为啥？？？？
      },
      success: function(res){
        var movies = subjectUtils.processSubjects(res.data.subjects);//拼接并保存有用的电影信息
          wx.hideToast(); //隐藏加载提示
        
         page.setData({
           movies:movies
         });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //电影详情
  detail:function(evevt){
    getApp().detail(evevt);
  }
})