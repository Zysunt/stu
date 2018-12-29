import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TixianPage } from '../tixian/tixian';
import { ChongzhiPage } from '../chongzhi/chongzhi';

/**
 * Generated class for the RemainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remaining',
  templateUrl: 'remaining.html',
})
export class RemainingPage {
public lingqian='5000.00'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemainingPage');
  }


  totixian(){
    this.navCtrl.push(TixianPage)
  }

  tochongzhi(){
    this.navCtrl.push(ChongzhiPage)
  }
}
