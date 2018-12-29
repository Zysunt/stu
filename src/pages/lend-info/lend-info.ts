import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the LendInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lend-info',
  templateUrl: 'lend-info.html',
})
export class LendInfoPage {
  public now:any;
  public houtian:any;
  chujieren = 'lallaa';
  money = 454545;
  daojishi = '1小时59分4秒';
  huankuanDate = '2018-12-30';
  lilv = '12';
  day = "00";
  Hour="00";
  minute = "00";
  second= "00";
  jiekuanDate:any;
  curtime:any;
  strDate = this.day+this.Hour+this.minute+this.second;

  public lend_list:any;
public borrow_list:any;
public isLender:boolean;

  constructor(public navCtrl: NavController,
    public storage:Storage,
     public navParams: NavParams) {
  }

  countTime() {
    var date = new Date();
    
    //console.log(date.toLocaleDateString())
    // console.log(date.setDate(date.getDate()+2))
    var date = new Date();
    var now = date.getTime(); //当前时间时间戳
    
    // var month =date.getMonth()+1;
    // var days = date.getDay()+2;
    // console.log(month+ '-'+days)
    // this.jiekuanDate = date.getFullYear()+'-'+month+'-'+days;
    
    
    
    this.curtime=new Date(new Date().getTime()+8*60*60*1000).toISOString();
    // console.log(this.curtime.slice(0,10))
    this.jiekuanDate = this.curtime.slice(0,10);

    
    //两天后
    //var houtian=this.now+172800000
    // console.log(endDate);
    
    // date.toLocaleDateString();  
    // var end = date.setDate(date.getDate()+2); 
    // console.log('end'+end)
    // var endDate = new Date("2018-12-06 00:00:00");//设置截止时间
    // var end = endDate.getTime();
    // console.log('endDate:'+endDate);
    // console.log('end'+end)
   var leftTime = this.houtian - now; //时间差  
    // console.log(leftTime)                           
    var d, h, m, s, ms;
    if(leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        ms = Math.floor(leftTime % 1000);
        if(ms < 100) {
            ms = "0" + ms;
        }
        if(s < 10) {
            s = "0" + s;
        }
        if(m < 10) {
            m = "0" + m;
        }
        if(h < 10) {
            h = "0" + h;
        }
    } else {
        // console.log('已截止')
    }
    //将倒计时赋值到div中
    this.day = d;
    this.Hour = h;
    this.minute = m;
    this.second = s;
   
    //递归每秒调用countTime方法，显示动态时间效果
    setTimeout(this.countTime, 50);
}


ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.countTime()
}

  ionViewDidLoad() {
    // this.countTime()
    var date = new Date();
     this.now = date.getTime(); //当前时间时间戳
     this.houtian=this.now+172800000
   var that = this;
   this.isLender=this.navParams.get('isLender')
    console.log(this.isLender)
    
    if(this.isLender){
     this.storage.get('lend_list').then((val) =>{
       console.log(JSON.parse(val))
       this.chujieren=JSON.parse(val).username
       this.money=JSON.parse(val).lloan_money
       this.lilv=JSON.parse(val).lrate
       this.huankuanDate=JSON.parse(val).lback_time
     })
    }else{
      this.storage.get('borrow_list').then((val) =>{
        console.log(JSON.parse(val))
       this.chujieren=JSON.parse(val).lender_name
       this.money=JSON.parse(val).bloan_money
       this.lilv=JSON.parse(val).brate
       this.huankuanDate=JSON.parse(val).bback_time
      })
    }
    //console.log('ionViewDidLoad LendInfoPage');
  }

}
