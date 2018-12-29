import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {AddCreditPage} from '../add-credit/add-credit'

/**
 * Generated class for the MyCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-credit',
  templateUrl: 'my-credit.html',
})
export class MyCreditPage {
  public credits=[];
  public add:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCreditPage');
  }


  toaddcredit(){
    var that=this
    this.events.subscribe('card_infor',function(res){
      console.log(res)
      that.credits.push(res)
    })
    this.navCtrl.push(AddCreditPage)

  }

  ionViewDidEnter(){
    this.events.unsubscribe('card_infor')
  }
}
