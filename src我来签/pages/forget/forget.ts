import { Component } from '@angular/core';
import {  NavController, NavParams,  ToastController, LoadingController } from 'ionic-angular';
import { LoginPage} from '../../pages/login/login';
import { BaseUI } from '../../baseUI/baseUI';
import { Http,Jsonp} from '@angular/http';
import 'rxjs/Rx';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage extends BaseUI{
  private headers:any = new Headers({'Content-Type':'application/json'})
  public tel=1234567890;
  public msgcode:any;
  public newpsd:any;
  public telNum:any;
  public yanzhengma:any;
  public yanzhengmamsg:any;
 public passw1:any;
 public passw2:any;
  isDisabled = true;
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: true
}
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private toastCtrl: ToastController,
    public http:Http,
    public loadingCtrl:LoadingController
    ) {
      super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  
toLogin(){
  console.log(this.yanzhengmamsg)
  if(this.telNum==undefined){
    super.showToast(this.toastCtrl,'请输入手机号')
  } else if(/^1[3456789]\d{9}$/.test(this.telNum)==false){
    super.showToast(this.toastCtrl,"手机号格式不正确");
  } else if(this.yanzhengma==undefined){
    super.showToast(this.toastCtrl,"验证码不能为空");
  }else if(this.passw1!==this.passw2){
    super.showToast(this.toastCtrl,"输入密码不一致");
  }
  else if(this.telNum==this.yanzhengmamsg.mobile&&this.yanzhengma==this.yanzhengmamsg.verify_code&&this.passw1==this.passw2){
    var that=this
    this.http.post('http://yellow.situojinfu.com/index/login/forget',{mobile:this.telNum,password:this.passw1},{headers:this.headers})
    .map(res =>res.json()).subscribe(function(res){
      that.fns(res.message)
    })
  }
  
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}


  //验证码
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
      this.http.post(url,{mobile:this.telNum},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
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
    if(msg=='修改密码成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      this.navCtrl.pop()
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }


}
