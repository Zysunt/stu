import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
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


@Component({
  selector: 'page-lend',
  templateUrl: 'lend.html',
})
export class LendPage {
  public headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;
  public order_id:any;
  public borrow_id:any;
  public lender_id:any;
  public money:any;
  public back_date:any;
  public back_money:any;
  public interest:any;
  public name:any;
  public mobile:any;

  public launch:any;
  public idnum:any;
  manName:any;
  telNum:any;
  jiekuan:any;
  date:any;
  method:any='到期还本付息';
  yhuan:any;
  rate:any;
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
    var url='http://yellow.situojinfu.com/index/index/receiveOrder'
    this.http.post(url,{user_id:this.user_id,order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      // console.log(res)
      var list=res.data.order
      that.money=list.money
      that.back_date=list.back_date
      that.back_money=list.back_money
      that.interest=list.interest
      that.name=res.data.customer.name
      that.mobile=res.data.customer.mobile
      that.launch=res.data.launch
      that.idnum=res.data.lenderIdcard
      that.borrow_id=res.data.order.borrow_id
      that.lender_id=res.data.order.lender_id
    })
    
  }
  toLendedPage(){
    this.navCtrl.push(LendedPage,{
      borrow_name:this.name,
      money:this.money,
      interest:this.interest,
      back_date:this.back_date,
      idnum:this.idnum,
      borrow_id:this.borrow_id,
      lender_id:this.lender_id
    });
  }


  back(){
    this.navCtrl.pop()
  }
}
