import { Component } from '@angular/core';
import {  NavController, NavParams ,ToastController,LoadingController, ViewController} from 'ionic-angular';
import {BaseUI} from '../../baseUI/baseUI';
import { HomePage} from '../../pages/home/home';
import {Storage} from '@ionic/storage';
import {Http,Jsonp,Headers} from '@angular/http';
import 'rxjs/Rx'
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the LendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lended',
  templateUrl: 'lended.html',
})
export class LendedPage extends BaseUI {
  public headers:any = new Headers({'Content-Type':'application/json'});
  public lend_list:any;
  public borrow_list:any;
  public lender_id:any;
  public borrow_id:any;

  public user_id:any;
  public lender_name:any;
  public money:any;
  public money_ch:any;
  public interest:any;
  public back_date:any;
  public borrow_name:any;
  public idnum:any;
  
  public lender:any;
  public identity_num:any;
  public money_num:any;
  public backtime:any;
  public purpose:any;
  public borrower:any;
  public lender_tel:any;
  public isLender:boolean;
  public lsign:any;
  public lsignImage:any;
  public bsign:any;
  public bsignImage:any;
  
  showMima = false;
  psd:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public viewCtrl:ViewController,
    public storage:Storage,
    public http:Http,
    public sanitizer:DomSanitizer
) {
    super();
  }

  ionViewDidLoad() {
    var that=this
    this.borrow_name=this.navParams.get('borrow_name')
    this.money=this.navParams.get('money')
    this.money_ch=this.toChinesNum(this.money)
    this.interest=this.navParams.get('interest')
    this.back_date=this.navParams.get('back_date')
    this.idnum=this.navParams.get('idnum')
    this.borrow_id=this.navParams.get('borrow_id')
    this.lender_id=this.navParams.get('lender_id')
    var url='http://yellow.situojinfu.com/index/tool/getSignByUid'
    // 借款人签名
    this.http.post(url,{user_id:this.borrow_id},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
      // console.log(res.data.sign_base64)
      that.bsignImage=this.sanitizer.bypassSecurityTrustUrl('data:img/jpg;base64,'+res.data.sign_base64)
    })
    this.http.post(url,{user_id:this.lender_id},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
      that.lsignImage=this.sanitizer.bypassSecurityTrustUrl('data:img/jpg;base64,'+res.data.sign_base64)
    })
    this.storage.get('user').then((val) =>{
      that.lender_name=JSON.parse(val).name
      that.user_id=JSON.parse(val).id
    })
  }
  hidemima(){
    this.showMima=false;
  }
  showmima(){
    
    this.showMima=true;
    var t=setTimeout(function(){
      var ipt=document.getElementById('ipt') as HTMLInputElement
      ipt.focus()
    },500)
  }

  // ngAfterContentChecked(): void {
  //   var that=this
  //   var url='http://yellow.situojinfu.com/index/tool/checkTradePass'
  //   //Called after every check of the component's or directive's content.
  //   //Add 'implements AfterContentChecked' to the class.
  //   if(this.psd!=undefined){
  //     if(this.psd.length>=6){
  // //  var loading=super.showLoading(this.loadingCtrl,'正在验证密码...')
  //       // if(this.psd=='123456'){
  //         // loading.dismiss()
  //         // super.showToast(this.toastCtrl,'验证成功,正在跳转...')
  //         // this.navCtrl.popToRoot()
  //         // this.showMima=false;
  //       this.http.post(url,{user_id:this.user_id,password:this.psd},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
  //         console.log(res)
  //       })
  //       // }
  //       // else{
  //       //   loading.dismiss()
  //       //   super.showToast(this.toastCtrl,'密码错误，请重试...')
  //       // }
  //       // this.psd=''
  //     }
  //   }
  // }

  // 数字转中文
  toChinesNum(num){
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
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

  back(){
    this.viewCtrl.dismiss();
  }



  change(){
    var ipt=document.getElementById('ipt')
    }
    onChangeText(){
      if(this.psd!==undefined)
      if(this.psd.length==6){
        var ipt=document.getElementById('ipt') as HTMLInputElement
        ipt.blur()
        var that=this
        var url='http://yellow.situojinfu.com/index/tool/checkTradePass'
        this.http.post(url,{user_id:this.user_id,password:this.psd},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
                  // console.log(res)
                  that.fnpsd(res.message)
                })
      }
    }
    
    
    fnpsd(msg){
      var loading=super.showLoading(this.loadingCtrl,'正在验证密码...')
      if(msg=='交易密码正确'){
        loading.dismiss()
        super.showToast(this.toastCtrl,msg)
        this.navCtrl.popToRoot()
      }else{
        loading.dismiss()
        super.showToast(this.toastCtrl,msg)
      }
    }
}
