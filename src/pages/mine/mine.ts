import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import {ShimingPage} from '../shiming/shiming';
import {MyCreditPage} from '../my-credit/my-credit';
import {TransaccountPage} from '../transaccount/transaccount'
import { ProblemsPage } from '../problems/problems';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import {Storage} from '@ionic/storage';
import { SigningPage } from '../signing/signing';
import { DealPage } from '../deal/deal';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx'
import { BaseUI } from '../../baseUI/baseUI';
import { ShowPage } from '../show/show';
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public userid:any;
public is_shiming:any;
public is_zhima:any;
public is_yys:any;
public is_ds:any;
public is_txl:any;
public is_position:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:Storage,
     public myBrowser:InAppBrowser,
     public http:Http,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController,
     public events:Events) {
       super()
  }

  ionViewWillEnter() {
    var that=this
    this.storage.get('user').then((val) =>{
      var valj=JSON.parse(val)
      that.userid=valj.id
      console.log(that.userid)
      console.log(val)
      that.is_shiming=valj.is_shiming
      that.is_zhima=valj.is_zhima
      that.is_yys=valj.is_yys
      that.is_ds=valj.is_ds
      that.is_txl=valj.is_txl
      that.is_position=valj.is_position
    })
    this.events.subscribe('ref',function(res){
      console.log(res)
      if(res==1){
        var url='http://appv2.situojinfu.com/index/index/index'
        that.http.post(url,{user_id:that.userid},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var xx=res.data.userInfo
          that.is_shiming=xx.is_shiming
          that.is_zhima=xx.is_zhima
          that.is_yys=xx.is_yys
          that.is_ds=xx.is_ds
          that.is_txl=xx.is_txl
          that.is_position=xx.is_position
        })
      }
    })
  }

  ionViewDidEnter(){
    console.log(this.is_zhima)
  }

  toshiming(){
    // this.navCtrl.push(DealPage)
    this.navCtrl.push(SigningPage)
  }

  tomycredit(){
    this.navCtrl.push(MyCreditPage)
  }
  totransaccount(){
    this.navCtrl.push(TransaccountPage)
  }
  toproblems(){
    this.navCtrl.push(ProblemsPage)
  }
  toabout(){
    this.navCtrl.push(AboutPage)
  }

  tosetting(){
    this.navCtrl.push(SettingPage)
  }


  openhtml(){
    const browser=this.myBrowser.create('http://www.baidu.com');

    browser.show()
  }

  tooperator(userid){
    
    this.navCtrl.push(ShowPage)
    var that=this
    var url='http://appv2.situojinfu.com/api/gxb/yysToken'
    this.http.post(url,{user_id:userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      console.log(res.data.url)
     that.fns(res.message,res.data.url)
    })
  }

  todianshang(userid){
   
    this.navCtrl.push(ShowPage)
    var that=this
    var url='http://appv2.situojinfu.com/api/gxb/dsToken'
    this.http.post(url,{user_id:userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      console.log(res.data.url)
     that.fns(res.message,res.data.url)
    })
  }

  tozhama(userid){
    this.navCtrl.push(ShowPage)
    var that=this
    var url='http://appv2.situojinfu.com/api/gxb/zhimaToken'
    this.http.post(url,{user_id:userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      console.log(res.data.url)
     that.fns(res.message,res.data.url)
    })
  }


  fns(msg,url){
    var loading=super.showLoading(this.loadingCtrl,'请稍后...')
    if(msg=='获取token成功'){
      loading.dismiss()

const browser=this.myBrowser.create(url)
browser.show()

      console.log(url)
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }
}
