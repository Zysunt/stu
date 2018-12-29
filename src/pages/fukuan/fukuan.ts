import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LendInfoPage } from "../../pages/lend-info/lend-info";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the FukuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fukuan',
  templateUrl: 'fukuan.html',
})
export class FukuanPage {
  money=10000;
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public navParams: NavParams) {
  }
  dengdai(){
    this.navCtrl.push(LendInfoPage)
  }
  ionViewDidLoad() {
    var that = this;
    this.storage.get('lend_list').then((val)=>{
      console.log(JSON.parse(val));
      this.money = JSON.parse(val).lloan_money;
    })
    // console.log('ionViewDidLoad FukuanPage');
  }

}
