import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the AddCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-credit',
  templateUrl: 'add-credit.html',
})
export class AddCreditPage extends BaseUI{
  public card_holder:string;
  public bank_info:string;
  public card_number:any;
  public tel:any;
  public id_code:any;
  
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 59,//总共时间
    disable: true
}
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:Storage,
     public events:Events,
     public toastCtrl:ToastController) {
       super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCreditPage');
    this.storage.get('username').then((val) =>{
      this.card_holder=JSON.parse(val)
    })
  }

  
  settime() {
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
}

submitadd(){
  if(this.card_holder!==undefined&&this.bank_info!==undefined&&this.card_number!==undefined&&this.tel!==undefined&&this.id_code!==undefined){
    if(/^1[34578]\d{9}$/.test(this.tel)){
      var startIndex = JSON.stringify(this.card_number).length-3;
      var endIndex =JSON.stringify(this.card_number).length;
         var last_code= JSON.stringify(this.card_number).slice(startIndex-1,endIndex)
          var credits={
            bank:this.bank_info,
            card_type:'储蓄卡',
            last_code:last_code
          }
          this.events.publish('card_infor',credits,Date.now())
      this.navCtrl.pop()
    }else{
        super.showToast(this.toastCtrl,'手机号不正确...')
    }    
  }else{
super.showToast(this.toastCtrl,'请填写完整...')
  }
}
}
