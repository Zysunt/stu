import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  
  xiaoxis: any = [
    {
    date : "2018-12-14",
    time :"10:45"
  },
  {
    date : "2019-12-14",
    time :"10:45"
  },

]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
