import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the DealpsdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealpsd',
  templateUrl: 'dealpsd.html',
})
export class DealpsdPage  extends BaseUI{
  public tel:string;
  public id_code:any;
  public newpsd:any;
  public renewpsd:any;

  
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
    public viewCtrl:ViewController) {
      super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealpsdPage');
  }

  settime() {
    var myreg=/^1[3456789]\d{9}$/;
    if (this.tel ==undefined) {
       super.showToast(this.toastCtrl,'手机号不能为空')
    } else if(!myreg.test(this.tel)){
      super.showToast(this.toastCtrl,"手机号格式错误")
    }
    else {
      this.verifyCode.firdisable=false
       this.verifyCode.disable=true;
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
              this.settime();
            
      }, 1000);
      return;
    }
    }


submitpsd(){
  if(this.tel!==undefined&&this.id_code!==undefined&&this.newpsd!==undefined&&this.renewpsd!==undefined){
    var loading=super.showLoading(this.loadingCtrl,'正在提交...')
    super.showToast(this.toastCtrl,'修改成功')
    loading.dismiss()
    this.navCtrl.pop()
  }
}
}
