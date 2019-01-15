import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Refresher } from 'ionic-angular';
import { LiabilitiesPage} from '../../pages/liabilities/liabilities';
import { LendPage } from '../../pages/lend/lend';
import { SendSuccessPage} from '../../pages/send-success/send-success';
import {DaishouPage} from '../../pages/daishou/daishou';
import { DaihuanPage} from '../../pages/daihuan/daihuan';
import { NewsPage} from '../../pages/news/news';
import { RemainingPage } from '../remaining/remaining';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import "rxjs/Rx";
import { ScanNextPage } from '../scan-next/scan-next';
import { QrdcanPage } from '../qrdcan/qrdcan';
import { ZhanqiPage } from '../zhanqi/zhanqi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public headers:any = new Headers({'Content-Type':'application/json'});
  appType = 'shou';
  public totalBorrow:any;
  public totalLend:any;
  public user_id:any;
  public user_info:any;

  public curpages=1;
  public curpagef=1;
  public apps: any = {
    'shou': [
     
    ],
    'fa': [
      
    ]  
  };

  constructor(public navCtrl: NavController,
    public storage:Storage,
    public http:Http) {

  }


ionViewWillEnter(){
  this.curpagef=1
  this.curpages=1
  var that=this
  var url='http://yellow.situojinfu.com/index/index/index'
  this.storage.get('user').then((val) =>{
    that.user_id=JSON.parse(val).id
    this.http.post(url,{user_id:that.user_id,page:1,page_size:8},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      // this.http.post(url,{user_id:2941},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
      that.totalBorrow=res.data.totalBorrow
      that.totalLend=res.data.totalLend
     that.apps['shou']=res.data.borrowList.data
     that.apps['fa']=res.data.lendList.data
    })
  })
}

  getItems(type: any) {
    return this.apps[type];
  }


  doRefresh(refresher: Refresher) {
    this.curpagef=1
    this.curpages=1
    var that=this
    var url='http://yellow.situojinfu.com/index/index/index'
    this.http.post(url,{user_id:this.user_id,page:1,page_size:8},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
     that.apps['shou']=res.data.borrowList.data
     that.apps['fa']=res.data.lendList.data
     console.log(that.apps['shou'])
    })
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }
    



    toLiabilities(id){
this.navCtrl.push(LiabilitiesPage,{
  user_id:id
});
    }
 
    tolend(user_id,order_id,borrow_id){
      this.navCtrl.push(LendPage,{
        user_id:user_id,
        order_id:order_id,
        borrow_id:borrow_id
      })
    }

    toNews(){
      this.navCtrl.push(NewsPage);
    }
    ToDaihuan(){
this.navCtrl.push(DaihuanPage);
    }
    ToDaishou(){
      this.navCtrl.push(DaishouPage);
      // this.navCtrl.push(ZhanqiPage)
    }

    tocharge(){
      this.navCtrl.push(RemainingPage)
    }


    // 时间戳转yyyy-mm-dd
    fmtDate(obj){
      var date =  new Date(obj);
      var y = 1900+date.getFullYear()
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
  }


  Scan(){
    this.navCtrl.push(QrdcanPage)
  }


  // 分页
  doInfinite(infiniteScroll) {
    var that=this
  var url='http://yellow.situojinfu.com/index/index/index'
    if(this.appType=='shou'){
      this.curpages++
      this.http.post(url,{user_id:this.user_id,page:this.curpages,page_size:8},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
       console.log(res)
        that.totalBorrow=res.data.totalBorrow
        that.totalLend=res.data.totalLend
          for(var i=0;i<res.data.borrowList.data.length;i++){
            that.apps['shou'].push(res.data.borrowList.data[i])
          }
  
        infiniteScroll.complete();
  
          if (that.apps['shou'].length>=res.data.borrowList.total) {
          infiniteScroll.enable(false);
        }
        setTimeout(infiniteScroll.enable(true),1000)
      })
    }


    if(this.appType=='fa'){
      this.curpagef++
      this.http.post(url,{user_id:this.user_id,page:this.curpagef,page_size:8},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
        that.totalBorrow=res.data.totalBorrow
        that.totalLend=res.data.totalLend
          for(var i=0;i<res.data.lendList.data.length;i++){
            that.apps['fa'].push(res.data.lendList.data[i])
          }
  
        infiniteScroll.complete();
  
          if (that.apps['fa'].length>=res.data.lendList.total) {
          infiniteScroll.enable(false);
        }

       setTimeout(infiniteScroll.enable(true),1000)
      })
    }
  }


}
