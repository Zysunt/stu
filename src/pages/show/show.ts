import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the ShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPage');
  }

  ionViewWillLeave(){
    this.events.publish('ref',1)
  }
}
