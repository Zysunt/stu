import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
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
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import {timer} from 'rxjs/observable/timer';
import { BaseUI } from '../../baseUI/baseUI';
import { ShowPage } from '../show/show';
import {Broadcaster} from '@ionic-native/broadcaster'
import { DealpsdPage } from '../dealpsd/dealpsd';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public userid:any;
  // 是否上传过身份证
  public ided:any=false;
  public dealpsded:any=true;

public is_shiming:any=false;
public is_zhima:any=false;
public is_yys:any=false;
public is_ds:any=false;
public is_txl:any=false;
public is_position:any=false;
public mobile:any;
public subscription:Subscription
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:Storage,
     public myBrowser:InAppBrowser,
     public http:Http,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController,
     public events:Events,
     public broadcaster:Broadcaster,
     ) {
       super()
  }

  ionViewWillEnter() {  
    var that=this
    this.storage.get('user').then((val) =>{
      var valj=JSON.parse(val)
      that.userid=valj.id
    var url='http://yellow.situojinfu.com/index/index/index'
    that.http.post(url,{user_id:that.userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      if(res.data.userInfo.name==null){
        that.ided=false
      }else{
        that.ided=true
      }
      if(res.data.trade==0){
        that.dealpsded=false
      }else{
        that.dealpsded=true
      }
      var xx=res.data.userInfo
      that.is_shiming=xx.is_shiming
      that.is_zhima=xx.is_zhima
      that.is_yys=xx.is_yys
      that.is_ds=xx.is_ds
      that.is_txl=xx.is_txl
      that.is_position=xx.is_position
      that.mobile=xx.mobile
    })
    })
    
       
  }

  // ionViewDidEnter(){
  //   alert('enter')
  //   // if( this.subscription &&  !this.subscription.closed ) return;
  //   alert('begin')
  //   this.broadcaster.addEventListener('RETURN.SHIMING').subscribe((event) =>{
  //     console.log(event+'didenter')
  //       this.navCtrl.push(SigningPage)
  //   });
  //   alert('end')
  // }

  ionViewDidLoad(){
    var that=this
    const ev = "RETURN.YYS"
    this.broadcaster.addEventListener(ev)
        .subscribe( event =>
          {

            alert('success_yys')
          console.log(event)
          that.shuaxin()
          alert('refresh complete')
          });

          const ev2 = "RETURN.SHIMING"
    this.broadcaster.addEventListener(ev2)
        .subscribe( event =>
          {
            alert('success_shiming')
            console.log(event)
            that.ided=true
          that.navCtrl.push(DealpsdPage)
          });

          const ev3 = "RETURN.DS"
          this.broadcaster.addEventListener(ev3)
              .subscribe( event =>
                {
                  alert('success_ds')
                  console.log(event)
                  that.shuaxin()
                  alert('refresh complete')
                });

                const ev4 = "RETURN.TXL"
                this.broadcaster.addEventListener(ev4)
                    .subscribe( event =>
                      {
                        alert('success_txl')
                        console.log(event)
                        that.shuaxin()
                        alert('refresh complete')
                      });

                      const ev5 = "RETURN.DLPOS"
                      this.broadcaster.addEventListener(ev5)
                          .subscribe( event =>
                            {
                              alert('success_dlpos')
                              console.log(event)
                              that.shuaxin()
                              alert('refresh complete')
                            });
  }


  // ionViewDidLeave(){

  //   if( !this.subscription || this.subscription.closed ) return;
  //   this.subscription.unsubscribe();

  // }


  toshiming(){
    if(this.ided==false){
      if( cordova.platformId === "browser" ) {
        const ev = "shiming";
        timer(1000,1000)
          .subscribe( (v)=> {
            let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
            document.dispatchEvent( event );
          })
  
    }
    else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
      const ev = "shiming";
      this.broadcaster.fireNativeEvent( ev, {user_id:this.userid,mobile:this.mobile});
  
    }
    }else if(this.dealpsded==false){
      this.navCtrl.push(DealpsdPage)
    }else{
      this.navCtrl.push(SigningPage)
    }
  }
 toyys(){
  if( cordova.platformId === "browser" ) {
      const ev = "yys";
      timer(1000,1000)
        .subscribe( (v)=> {
          let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
          document.dispatchEvent( event );
        })

  }
  else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
    const ev = "yys";
    this.broadcaster.fireNativeEvent( ev, {user_id:this.userid,mobile:this.mobile} );

  }
}
  
  tods(){
    if( cordova.platformId === "browser" ) {
      const ev = "ds";
      timer(1000,1000)
        .subscribe( (v)=> {
          let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
          document.dispatchEvent( event );
        })

  }
  else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
    const ev = "ds";
    this.broadcaster.fireNativeEvent( ev, {user_id:this.userid,mobile:this.mobile} );

  }
  }

txl(){
  if( cordova.platformId === "browser" ) {
    const ev = "txl";
    timer(1000,1000)
      .subscribe( (v)=> {
        let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
        document.dispatchEvent( event );
      })

}
else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
  const ev = "txl";
  this.broadcaster.fireNativeEvent( ev, {user_id:this.userid,mobile:this.mobile} );

}
}

dlpos(){
  if( cordova.platformId === "browser" ) {
    const ev = "dlpos";
    timer(1000,1000)
      .subscribe( (v)=> {
        let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
        document.dispatchEvent( event );
      })

}
else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
  const ev = "dlpos";
  this.broadcaster.fireNativeEvent( ev, {user_id:this.userid,mobile:this.mobile} );

}
}

  tomycredit(){

    // this.navCtrl.push(MyCreditPage)
    super.showToast(this.toastCtrl,'暂不支持添加银行卡，期待后续开放')
  }
  totransaccount(){
    // this.navCtrl.push(TransaccountPage)
    super.showToast(this.toastCtrl,'暂不支持转账，期待后续开放')
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



  tooperator(userid){
    
    // this.navCtrl.push(ShowPage)
    var that=this
    var url='http://yellow.situojinfu.com/api/gxb/yysToken'
    this.http.post(url,{user_id:userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
     that.fns(res.message,res.data.url)
    })
  }

  todianshang(userid){
   
    // this.navCtrl.push(ShowPage)
    var that=this
    var url='http://yellow.situojinfu.com/api/gxb/dsToken'
    this.http.post(url,{user_id:userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
     that.fns(res.message,res.data.url)
    })
  }

  tozhima(userid){
    // this.navCtrl.push(ShowPage)
    var that=this
    var url='http://yellow.situojinfu.com/api/gxb/zhimaToken'
    this.http.post(url,{user_id:this.userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
     console.log(res)
      that.fns(res.message,res.data.url)
    })
  }


  fns(msg,url){
    var loading=super.showLoading(this.loadingCtrl,'请稍后...')
    var that=this
    var url2='http://yellow.situojinfu.com/index/index/index'
    if(msg=='获取token成功'){
      loading.dismiss()
if(cordova.platformId === 'android'){
  var browser=this.myBrowser.create(url,'_blank','hideurlbar=yes')
}else if(cordova.platformId === 'ios'){
  var browser=this.myBrowser.create(url,'_blank')
}
browser.on('exit').subscribe(event =>{
  that.http.post(url2,{user_id:that.userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
    console.log(res)
    if(res.data.userInfo.name==null){
      that.ided=false
    }else{
      that.ided=true
    }
    if(res.data.trade==0){
      that.dealpsded=false
    }else{
      that.dealpsded=true
    }
    var xx=res.data.userInfo
    that.is_shiming=xx.is_shiming
    that.is_zhima=xx.is_zhima
    that.is_yys=xx.is_yys
    that.is_ds=xx.is_ds
    that.is_txl=xx.is_txl
    that.is_position=xx.is_position
    that.mobile=xx.mobile
  })
})
browser.show()
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }



  shuaxin(){
    var that=this
    var url='http://yellow.situojinfu.com/index/index/index'
    that.http.post(url,{user_id:this.userid},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      if(res.data.userInfo.name==null){
        that.ided=false
      }else{
        that.ided=true
      }
      if(res.data.trade==0){
        that.dealpsded=false
      }else{
        that.dealpsded=true
      }
      var xx=res.data.userInfo
      that.is_shiming=xx.is_shiming
      that.is_zhima=xx.is_zhima
      that.is_yys=xx.is_yys
      that.is_ds=xx.is_ds
      that.is_txl=xx.is_txl
      that.is_position=xx.is_position
      that.mobile=xx.mobile
    })
  }

  dsb(){
    console.log('ss')
  }
}
