// pages/movie/movie.js
var subjectUtils = require('../../utils/subjectsUtils.js'); //引入处理电影内容的工具js
Page({
   data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    movies:[] //获取的电影列表
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration:10000
    });
    this.loadMovie();//调用获取电影信息的方法
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
  //加载电影信息
  loadMovie:function(){
    var page = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters', //默认为北京地区
      header: {
      'Content-type': 'json'  //此处不知道为啥？？？？
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res.data.subjects);
         var movies = subjectUtils.processSubjects(res.data.subjects);//拼接并保存有用的电影信息

         wx.hideToast(); //隐藏加载提示
        //复制
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