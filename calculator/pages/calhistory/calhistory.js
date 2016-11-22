
var util = require('../../utils/util.js');

Page({
    data:{
        historys:[],
        test:""
    },
    //页面加载 一个页面只会调用一次,navigateBack 会卸载当前页面
    onLoad:function(){
        //取出历史
       var historys = wx.getStorageSync('calhistorys');
       //test 数据
       var testArr = [
           {expression:"1+1=2",time:new Date()},
           {expression:"2+1=3",time:new Date()},
           {expression:"4+1=5",time:new Date()}
        ];

        console.log(historys);

        console.log(historys.concat(testArr))

       this.data.historys = historys.concat(testArr).map(function(obj){
            obj.time = util.formatTime(new Date(obj.time));
            return obj;
        })

    }
})