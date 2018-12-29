import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TixianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tixian',
  templateUrl: 'tixian.html',
})
export class TixianPage {
public bank='建设银行';
public card_type='储蓄卡';
public card_num='1234';
public yue_ava='5000';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TixianPage');
  }

}
