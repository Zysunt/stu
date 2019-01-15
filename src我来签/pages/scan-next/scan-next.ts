import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MyCouponPage } from "../../pages/my-coupon/my-coupon";
import { HomePage } from "../../pages/home/home";
/**
 * Generated class for the ScanNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-scan-next',
  templateUrl: 'scan-next.html',
})
export class ScanNextPage {
  edu=100000;
  lilv = 0.2;
  public is_shiming:any;
  public is_zhima:any;
  public is_yys:any;
  public is_ds:any;
  public renz = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ToMsg(){
    this.navCtrl.push(MyCouponPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanNextPage');
  }
  toHome(){
    this.navCtrl.popToRoot();
  }

}
