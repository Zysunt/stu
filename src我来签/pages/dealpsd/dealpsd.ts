import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../baseUI/baseUI';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/Rx';
import { SigningPage } from '../signing/signing';

/**
 * Generated class for the DealpsdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dealpsd',
  templateUrl: 'dealpsd.html',
})
export class DealpsdPage  extends BaseUI{
  private headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;
  public tel:string;
  public id_code:any;
  public newpsd:any;
  public renewpsd:any;
  public yanzhengmamsg:any;

  
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 59,//总共时间
    disable: true,
    firdisable:true
}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public viewCtrl:ViewController,
    public http:Http,
    public storage:Storage) {
      super()
  }

  ionViewDidLoad() {
    var that=this
    this.storage.get('user').then((val) =>{
      that.user_id=JSON.parse(val).id
    })
  }

    //验证码
    settime() {
      var myreg=/^1[3456789]\d{9}$/;
      if (this.tel ==undefined) {
         super.showToast(this.toastCtrl,'电话不能为空')
      } else if(!myreg.test(this.tel)){
        super.showToast(this.toastCtrl,"电话格式错误")
      }
      else {
        var that=this
        this.verifyCode.disable=false;
        this.verifyCode.firdisable=false;
        var url='http://yellow.situojinfu.com/api/yxsms/send'
        this.http.post(url,{mobile:this.tel},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          that.yanzhengmamsg={
            verify_code:res.data.verify_code,
            mobile:res.data.mobile
          }
        })
       this.dingshiqi()
      }
      }
    
  
  // 定时器
      dingshiqi() {
        if (this.verifyCode.countdown == 0) {
          this.verifyCode.countdown=60;
            this.verifyCode.verifyCodeTips = "获取验证码";
            this.verifyCode.disable = true;
            return;
        } else {
            this.verifyCode.countdown--;
            this.verifyCode.disable=false;
        }
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
                this.dingshiqi();
        }, 1000);
    }
  
    fns(msg){
      var loading=super.showLoading(this.loadingCtrl,'密码修改中...')
      if(msg=='修改成功'){
        super.showToast(this.toastCtrl,msg)
        loading.dismiss()
        this.navCtrl.push(SigningPage)
      }else{
        super.showToast(this.toastCtrl,msg)
        loading.dismiss()
      }
    }


submitpsd(){
  if(this.tel==undefined){
    super.showToast(this.toastCtrl,'请输入手机号')
  } else if(/^1[3456789]\d{9}$/.test(this.tel)==false){
    super.showToast(this.toastCtrl,"手机号格式不正确");
  } else if(this.id_code==undefined){
    super.showToast(this.toastCtrl,"验证码不能为空");
  }else if(this.newpsd!==this.renewpsd){
    super.showToast(this.toastCtrl,"输入密码不一致");
  }else if(this.newpsd==undefined){
    super.showToast(this.toastCtrl,"密码不能为空");
  }
  else if(this.tel==this.yanzhengmamsg.mobile&&this.id_code==this.yanzhengmamsg.verify_code&&this.newpsd==this.renewpsd){
    var that=this
    this.http.post('http://yellow.situojinfu.com/index/tool/changeTradePass',{user_id:this.user_id,password:this.newpsd},{headers:this.headers})
    .map(res =>res.json()).subscribe(function(res){
      that.fns(res.message)
    })
  }
}
}
