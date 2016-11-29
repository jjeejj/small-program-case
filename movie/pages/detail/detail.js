// pages/detail/detail.js
var subjectUtils = require('../../utils/subjectsUtils.js'); //引入处理电影内容的工具js
Page({
  data:{
    movie:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('options',options);
    wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration:10000
    });
    this.loadMovie(options.id);
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
  //加载电影详情信息
  loadMovie:function(movieId){
    var page = this;
    // var movieId = wx.getStorageSync('movieId');//从缓存中获取电影id
    wx.request({
      url: 'https://api.douban.com//v2/movie/subject/'+movieId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-type':'json'
      }, // 设置请求的 header
      success: function(res){
        // success
        var movie = subjectUtils.processSubject(res.data);//拼接并保存有用的电影信息
        wx.hideToast(); //隐藏加载提示
       // wx.removeStorageSync('movieId'); //应该清楚指定的缓存
        
         page.setData({
           movie:movie
         });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})