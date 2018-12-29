import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LendedPage} from '../../pages/lended/lended';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/Rx'
/**
 * Generated class for the LendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lend',
  templateUrl: 'lend.html',
})
export class LendPage {
  public headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;
  public order_id:any;
  public borrow_id:any;
  public money:any;
  public back_date:any;
  public back_money:any;
  public interest:any;
  public name:any;
  public mobile:any;
  manName = "mskda";
  telNum = 15487876564;
  jiekuan = 12454545;
  date = "2018-12-30";
  method = "到期还本付息";
  yhuan = 4546856;
  rate = 24;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:Storage,
     public http:Http) {
  }

  ionViewDidLoad() {
    var that=this
    this.user_id=this.navParams.get('user_id')
    this.order_id=this.navParams.get('order_id')
    this.borrow_id=this.navParams.get('borrow_id')
    console.log(this.user_id)
    console.log(this.order_id)
    console.log(this.borrow_id)
    var url='http://appv2.situojinfu.com/index/index/receiveOrder'
    this.http.post(url,{user_id:2941,order_id:952},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      var list=res.data.order
      that.money=list.money
      that.back_date=list.back_date
      that.back_money=list.back_money
      that.interest=list.interest
      that.name=res.data.customer.name
      that.mobile=res.data.customer.mobile
    })
    console.log('ionViewDidLoad LendPage');
    
  }
  toLendedPage(){
    this.navCtrl.push(LendedPage);
  }


  back(){
    this.navCtrl.pop()
  }
}
