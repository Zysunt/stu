import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DealPage} from '../deal/deal'

/**
 * Generated class for the ZhengxinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zhengxin',
  templateUrl: 'zhengxin.html',
})
export class ZhengxinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZhengxinPage');
  }

  todeal(){
    this.navCtrl.push(DealPage)
  }
}
