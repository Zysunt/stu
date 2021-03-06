import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/Rx'
import { Http ,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';


/**
 * Generated class for the LiabilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liabilities',
  templateUrl: 'liabilities.html',
})
export class LiabilitiesPage {
rate = 24;
public headers:any = new Headers({'Content-Type':'application/json'});
public borrow_name:any;
public user_id:any;
public user:any;
public overRate:any;
public currentUser:any;
public totalCount:any;
public frozenCount:any;
public notOverCount:any;
public overCount :any;
public totalMoney:any;
public frozenMoney:any;
public notOverMoney:any;
public overMoney:any;
public hexiaoNotOverCount :any;
public hexiaoNotOverMoney:any;
public hexiaoOverCount :any;
public hexiaoOverMoney :any;
public huanMoney :any;
public alreadHuanMoney:any;
public complainCount:any;
public complainMoney:any;
public orderList:any;


// public daihuan = 1000000000;
// public daishou = 122222222;
// public startTime = "2018-12-12";
// public endTime = "2018-12-30";
// public yuqi = 4;
// total = 205656;
// sxwyu = 305666;
// sxyyu = 1055566;
// dongjie =222;
// hxwyu = 225;
// hxyyu = 55588;
// shensu = 5548;
// totalMon = 15487878;
// name = 'mbsud';
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     public storage:Storage) {
  }
  //当将要进入页面时触发
  ionViewWillEnter() {
    console.log('ionViewDidLoad LiabilitiesPage');
    this.user_id=this.navParams.get('user_id')//拿首页传过来的id  user_id
    console.log(this.user_id)
    var that= this  //弄个临时的this指针
    var url='http://appv2.situojinfu.com/index/borrow/fuzhai'
    this.http.post(url,{user_id:this.user_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      that.overRate=res.data.overRate//数据对应
      that.borrow_name=res.data.currentUser.name;
      that.totalCount=res.data.totalCount;
      that.frozenCount=res.data.frozenCount;
      that.notOverCount=res.data.notOverCount;
      that.overCount =res.data.overCount;
      that.totalMoney=res.data.totalMoney;
      that.frozenMoney=res.data.frozenMoney;
      that.notOverMoney=res.data.notOverMoney;
      that.overMoney=res.data.overMoney;
      that.hexiaoNotOverCount=res.data.hexiaoNotOverCount;
      that.hexiaoNotOverMoney=res.data.hexiaoNotOverMoney;
      that.hexiaoOverCount =res.data.hexiaoOverCount;
      that.hexiaoOverMoney=res.data.hexiaoOverMoney;
      that.huanMoney=res.data.huanMoney;
      that.alreadHuanMoney=res.data.alreadHuanMoney;
      that.complainCount=res.data.complainCount;
      that.complainMoney=res.data.complainMoney;
      that.orderList=res.data.orderList;
    })
  }

}
