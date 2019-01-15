import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { ConfirmPage } from '../confirm/confirm';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx'
import { BaseUI } from '../../baseUI/baseUI';
import { FukuanPage } from '../fukuan/fukuan';
import { LendInfoPage } from '../lend-info/lend-info';
import { DomSanitizer } from '@angular/platform-browser';



/**
 * Generated class for the JietiaoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-jietiao-detail',
  templateUrl: 'jietiao-detail.html',
})
export class JietiaoDetailPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
public lend_list:any;
public borrow_list:any;
public order_id:any;

public lender:any;
public identity_num:any;
public money_num:any;
public money_ch:any;
public interest:any;
public backtime:any;
public purpose:any;
public borrower:any;
public lender_tel:any;
public isLender:boolean;
// 签名地址
public lsignImage:any;
public bsignImage:any;
public isDel=false;
public isSend=false;

public lenderIdcard:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public storage:Storage,
    public http:Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public sanitizer:DomSanitizer
    ) {
      super()
  }

  //阿拉伯数字转中文


  ionViewDidLoad() {


    var that=this
    console.log('ionViewDidLoad JietiaoDetailPage');
    this.isLender=this.navParams.get('isLender')
    // this.lsignImage=this.navParams.get('lsignImage')
    // this.bsignImage=this.navParams.get('bsignImage')
    if(this.isLender){
      this.storage.get('user').then((val) =>{
        this.lsignImage=this.sanitizer.bypassSecurityTrustUrl('data:img/jpg;base64,'+JSON.parse(val).sign_base64)
      })
     this.storage.get('lend_list').then((val) =>{
       this.lender=JSON.parse(val).username
       this.money_num=JSON.parse(val).lloan_money
       this.interest=JSON.parse(val).lrate
       this.borrower=JSON.parse(val).borrower_name
       this.backtime=JSON.parse(val).lback_time
       this.money_ch=this.toChinesNum(this.money_num)
       this.order_id=JSON.parse(val).order_id
      this.lenderIdcard=JSON.parse(val).lenderIdcard
     })
    }else{
      this.storage.get('user').then((val) =>{
        this.bsignImage=this.sanitizer.bypassSecurityTrustUrl('data:img/jpg;base64,'+JSON.parse(val).sign_base64)
      })
      this.storage.get('borrow_list').then((val) =>{
       this.lender=JSON.parse(val).lender_name
       this.money_num=JSON.parse(val).bloan_money
       this.interest=JSON.parse(val).brate
       this.borrower=JSON.parse(val).username
       this.backtime=JSON.parse(val).bback_time
       this.purpose=JSON.parse(val).purpose
       this.order_id=JSON.parse(val).order_id
       this.money_ch=this.toChinesNum(this.money_num)
       this.lenderIdcard=JSON.parse(val).lenderIdcard
      })
    }
  }

  back(){
    this.viewCtrl.dismiss()
  }

  send(){
    this.isSend=true
  }
  cancle(){
    this.isSend=false;
  }

  del(){
    this.isDel=true;
  }
  delif(a){
    var that=this
    if(a==0){
      this.isDel=false;
    }else{
      var url='http://yellow.situojinfu.com/index/order/deleteOrder'
      this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.fndel(res.data)
      })
    }
  }


  fndel(data){
    var loading=super.showLoading(this.loadingCtrl,'借条删除中...')
    if(data=='删除借条成功'){
      super.showToast(this.toastCtrl,data)
      loading.dismiss()
      this.navCtrl.popToRoot()
    }else{
      super.showToast(this.toastCtrl,data)
      loading.dismiss()
    }
  }

  tousers(){
    this.navCtrl.push(UsersPage)
  }

  toconfirm(){
    if(this.isLender){
      this.navCtrl.push(FukuanPage,{
        isLender:this.isLender
      })
    }else{
      this.navCtrl.push(LendInfoPage,{
        isLender:this.isLender
      })
    }
  }






toChinesNum(num){
  let changeNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; //changeNum[0] = "零"
  let unit = ["", "拾", "佰", "仟", "萬"];
  num = parseInt(num);
  let getWan = (temp) => {
  let strArr = temp.toString().split("").reverse();
  let newNum = "";
  for (var i = 0; i < strArr.length; i++) {
    newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
  }
   return newNum;
 }
 let overWan = Math.floor(num / 10000);
 let noWan = JSON.stringify(num % 10000);
 if (noWan.toString().length < 4) noWan = "0" + noWan;
 return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}

}
