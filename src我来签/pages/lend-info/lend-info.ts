import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {  Storage } from "@ionic/storage";
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx'
import { BaseUI } from '../../baseUI/baseUI';
import { TabsPage } from "../../pages/tabs/tabs";

/**
 * Generated class for the LendInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-info',
  templateUrl: 'lend-info.html',
})
export class LendInfoPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
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
public order_id:any;

  constructor(public navCtrl: NavController,
    public storage:Storage,
     public navParams: NavParams,
     public http:Http,
     public toastCtrl:ToastController,
     public loadingCtrl:LoadingController) {
       super()
  }

  countTime() {
    var date = new Date();
    var now = date.getTime(); //当前时间时间戳
    
    this.curtime=new Date(new Date().getTime()+8*60*60*1000).toISOString();
    this.jiekuanDate = this.curtime.slice(0,10);

   var leftTime = this.houtian - now; //时间差                            
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
    
    if(this.isLender){
     this.storage.get('lend_list').then((val) =>{
       this.chujieren=JSON.parse(val).username
       this.money=JSON.parse(val).lloan_money
       this.lilv=JSON.parse(val).lrate
       this.huankuanDate=JSON.parse(val).lback_time
       this.order_id=JSON.parse(val).order_id
     })
    }else{
      this.storage.get('borrow_list').then((val) =>{
       this.chujieren=JSON.parse(val).lender_name
       this.money=JSON.parse(val).bloan_money
       this.lilv=JSON.parse(val).brate
       this.huankuanDate=JSON.parse(val).bback_time
       this.order_id=JSON.parse(val).order_id
      })
    }
    //console.log('ionViewDidLoad LendInfoPage');
  }


  tixing(){
    var loading=super.showLoading(this.loadingCtrl,'正在发送提醒...')
    loading.dismiss()
    super.showToast(this.toastCtrl,'已将提醒发送给对方')
    this.navCtrl.popToRoot();
  }



  delif(){
    var that=this
      var url='http://yellow.situojinfu.com/index/order/deleteOrder'
      this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.fndel(res.data)
      }) 
  }


  fndel(data){
    var loading=super.showLoading(this.loadingCtrl,'取消借条中...')
    if(data=='删除借条成功'){
      super.showToast(this.toastCtrl,data)
      loading.dismiss()
      this.navCtrl.popToRoot()
    }else{
      super.showToast(this.toastCtrl,data)
      loading.dismiss()
    }
  }

}
