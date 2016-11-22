Page({
    data:{
        back:"back",
        clean:"clean",
        negative:"negative",
        plus:"+",
        reduce:"-",
        multiply:"*",
        divide:"/",
        equal:"=",
        one:"1",
        two:"2",
        three:"3",
        four:"4",
        five:"5",
        six:"6",
        seven:"7",
        eight:"8",
        nine:"9",
        zero:"0",
        point:".",
        history:"history",
        screen:"0",//运算框内的值
        arrs:[],//点击的内容集合
        lastIsOperator:false,
        historys:[]//计算历史

    },
    //点击事件
    clickButton:function(event){
        // console.log();
        var value = event.currentTarget.id ; //当前按钮上的的id值值
        var screen = this.data.screen; //点击之前的显示的值

        
        if(value == this.data.back){//退格处理
            if(screen==0){
                return;
            }
            screen = screen.substring(0,screen.length-1);
            if(screen=="" || screen =="-"){ //退格如果选取后没了了，或只有一个正负号了了，就直接置为0
                screen = "0";
            }

            //输入内容的数组，最后一个去掉
            this.data.arrs.pop();

        }else if(value == this.data.clean){//清屏处理
            screen = "0";
            this.data.arrs.length = 0; //输入的内容也清空

        }else if(value == this.data.negative){ // + - 正负号

            if(screen==0){
                return;
            }
            var firstWorld = screen.substring(0,1);
            if(firstWorld=="-"){
                screen = screen.substring(1,screen.length);
                this.data.arrs.shift();//去掉第一个 '-'
            }else{
                screen = "-"+screen;
                this.data.arrs.unshift();//在第一位增加 '-'
            }
        }else if(value == this.data.plus || value == this.data.reduce || value == this.data.multiply || value == this.data.divide){ //加减乘除操作符符，只能有一个
            if(this.data.lastIsOperator || screen =="0"){
                return;
            }else{
                this.data.lastIsOperator = !this.data.lastIsOperator;
                screen+=value;
                this.data.arrs.push(value);
            }
        }else if(value == this.data.equal){ //点击等于号的情况,需要存历史记录的
            if(screen==0){ //屏幕只有 0 数字
                return;
            }
            //判断最后一个字符是不是 数字
            var lastWord = screen.slice(-1);
            if(isNaN(lastWord)){
                return;
            }
            var num = '';
            var lastOperator = '';
            var arrs = this.data.arrs;
            var optarrs = []; //可以用于计算的数组
            for(var i in arrs){ //拆分点击输入的内容
                let arr = arrs[i];
                if(isNaN(arr) ==false || arr ==this.data.point || arr ==this.data.negative){ //是数字 或是点点 或是
                    num+=arr
                }else{ //下面就是操作符
                    lastOperator = arr;
                    optarrs.push(num);
                    optarrs.push(arr);
                    num='';//复原 重新记下一个数据
                }
            };
            optarrs.push(Number(num)); //把最后一个数组，转为数组，并加到拆分用于计算的数组中中
            var result = Number(optarrs[0]) *1.0 ;//取第一个数字，转为浮点型
            for(var i =1 ;i<optarrs.length;i++){
                if(isNaN(optarrs[i])){
                    if(optarrs[i] == this.data.plus){
                        result += Number(optarrs[i + 1]);
                    }else if(optarrs[i] == this.data.reduce){
                        result -= Number(optarrs[i + 1]);
                    }else if(optarrs[i] == this.data.multiply){
                        result *= Number(optarrs[i + 1]);
                    }else if(optarrs[i] == this.data.divide){
                        result /= Number(optarrs[i + 1]);
                    }
                }
            }
            //保存历史记录
            var history = {
                expression:screen+' = '+result,
                time: new Date()
            }
            this.data.historys.push(history);
            wx.setStorageSync('calhistorys', this.data.historys);

            //清空记录，便于下一次计算
            this.data.arrs.length = 0;
            //把结果存入
            this.data.arrs.push(result);
            screen = result;
            // screen = eval(screen); 微信为了安全，屏蔽了该方法,还有他是 window的方法
        }else{
            if(this.data.lastIsOperator){//只有在当前值为为true时点击其他数字之后后 改为false
                this.data.lastIsOperator = !this.data.lastIsOperator; 
            }
            if(screen=="0"){
                screen = value;
            }else{
               screen+= value
            }
            this.data.arrs.push(value);
        };

        this.setData({
            screen:screen
        })
    },
    //计算历史
    history:function(){
        wx.navigateTo({
          url: '../calhistory/calhistory',
          success: function(res){
            // success
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