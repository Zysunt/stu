import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController, Header, LoadingController } from 'ionic-angular';
import{ TabsPage} from '../../pages/tabs/tabs';
import {BaseUI} from '../../baseUI/baseUI';
import{Http,Headers,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import "rxjs/Rx";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {
  private headers = new Headers({'Content-Type':'application/json'})
  public tel=1234567890;
  public msgcode:any;
  public newpsd:any;
  public telNum:any;
  public yanzhengma:any;
public  password:any;
public regmsg:any;

  public login_info:any;

 
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: true
}
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl:ToastController,
    private http:Http,
    private jsonp:Jsonp,
    public loadingCtrl:LoadingController,
    public storage:Storage
    ) {
    super()
  }

  ionViewDidLoad() {
    
  }

  toHome(){
    if(this.telNum==undefined){
      super.showToast(this.toastCtrl,"请输入手机号")
    }else if(/^1[3456789]\d{9}$/.test(this.telNum)==false){
      super.showToast(this.toastCtrl,"手机号格式不正确")
    }else if(this.password==undefined){
      super.showToast(this.toastCtrl,"密码不能为空")
    } else if(this.yanzhengma==undefined){
super.showToast(this.toastCtrl,'请输入验证码...')
    }
      else if(this.telNum==this.login_info.mobile&&this.yanzhengma==this.login_info.verify_code){
        var that=this
      
      this.http.post('http://yellow.situojinfu.com/index/login/register',{mobile:this.telNum,password:this.password},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.storage.set('user',JSON.stringify(res.data))
        this.regmsg=res.message
       that.fns(this.regmsg)
      })
  }
}

  fns(msg){
    var loading=super.showLoading(this.loadingCtrl,'注册中...')
    if(msg=='注册成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      this.navCtrl.setRoot(TabsPage);
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }

//倒计时
settime() {
  var myreg=/^1[3456789]\d{9}$/;
  if (this.telNum ==undefined) {
     super.showToast(this.toastCtrl,'电话不能为空')
  } else if(!myreg.test(this.telNum)){
    super.showToast(this.toastCtrl,"电话格式错误")
  }
  else {
    var that=this
     this.verifyCode.disable=true;
     var url='http://yellow.situojinfu.com/api/yxsms/send'
     this.http.post(url,JSON.stringify({mobile:this.telNum}),{headers:this.headers}).subscribe(function(res){
       var callback=JSON.parse(res["_body"]).data
       that.login_info={
         mobile:callback.mobile,
         verify_code:callback.verify_code
       }
     })
    this.dingshiqi()
  }
  }


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

}
