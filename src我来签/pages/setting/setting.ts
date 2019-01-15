import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DealpsdPage } from '../dealpsd/dealpsd';
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends BaseUI{

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController) {
      super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }


  tochangepsd(){
    this.navCtrl.push(DealpsdPage)
  }



  changeheadface(){
    super.showToast(this.toastCtrl,'暂未开放,敬请期待')
  }

}
