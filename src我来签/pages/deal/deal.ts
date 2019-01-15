import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx'
import { BaseUI } from '../../baseUI/baseUI';
import { SigningPage } from '../signing/signing';

/**
 * Generated class for the DealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html',
})
export class DealPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
public user_id:any;
public psd:any;
public repsd:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     public storage:Storage,
     public toastCtrl:ToastController,
     public loadingCtrl:LoadingController) {
       super()
  }

  ionViewDidLoad() {
    var that=this
     
    console.log('ionViewDidLoad DealPage');
    this.storage.get('user').then((val) =>{
      that.user_id=JSON.parse(val).id
      
    })

    console.log(this.user_id)
  }


  tosigning(){
    if(this.psd==undefined || this.repsd==undefined){
      super.showToast(this.toastCtrl,'请填写完整')
    }else if(this.psd==this.repsd){
      var that=this
      var url ='http://yellow.situojinfu.com/index/auth/setTradePass'
      this.http.post(url,{user_id:this.user_id,trade_pass:this.psd},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)
        that.fns(res.message)
      })
    }else{
      super.showToast(this.toastCtrl,'输入密码不一致')
    }
  }

  fns(msg){
    var loading=super.showLoading(this.loadingCtrl,'提交密码中...')
    if(msg=='设置交易密码成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      this.navCtrl.push(SigningPage)
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }

}
