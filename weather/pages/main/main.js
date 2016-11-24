// pages/main/main.js
const baidu_mao_key = '你的百度key';
var geocoding_url = 'http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&ak='+baidu_mao_key+'&location=';
var weather_url = 'http://api.map.baidu.com/telematics/v3/weather?output=json&ak='+baidu_mao_key+'&location=';

Page({
  data:{
    city:"",//城市
    today:{}, //今天天气信息
    future:[] // 未来三天天气信息
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadInfo();
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

  // 得到当前的经纬度
  loadInfo:function(){
    var page = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude;//纬度
        var longitude = res.longitude;//经度
        //发送获取城市的请求
        page.loadCity(latitude,longitude);
      }
    })
  },
  /**
   * 根据经纬度获取地址信息
   * @param latitude 纬度
   * @param longitude 经度
   */
  loadCity:function(latitude,longitude){
    var page = this;
    // console.log(geocoding_url+latitude +','+longitude)
    wx.request({
      url: geocoding_url +latitude +','+longitude, //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        var city = res.data.result.addressComponent.city;
        page.data.city = city;

        //获取天气情况
        page.loadWeather(city)
      }
    })
  },
  /**
   * 根据城市获取天气情况
   * @param city 城市
   */
  loadWeather:function(city){
    var page = this;
    console.log(weather_url+city)
    wx.request({
      url: weather_url+city, //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var data = res.data
        console.log('data',data)
        var weatherData = data.results[0].weather_data;//所有天气数组

        console.log('weatherData',weatherData);

        var todayWeather = weatherData.shift(); //返回的是当天的天气,剩余的事我来天气

        //今天天气信息
        page.data.today.suggest = data.results[0].index[0].des;//穿衣建议
        page.data.today.date = data.date;//今天日期
        page.data.today.tempRange = todayWeather.temperature;//温度范围
        page.data.today.weather = todayWeather.weather;//天气
        page.data.today.wind = todayWeather.wind;//风

        var index = todayWeather.date.indexOf('：'); //第一出线: 的位置
        page.data.today.temp = todayWeather.date.slice(index+1,-1);//当前温度

        //未来天气
       page.data.future = weatherData;
      }
    })
  }
})