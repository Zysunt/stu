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
import {Http} from '@angular/http';
import "rxjs/Rx";
import { ScanNextPage } from '../scan-next/scan-next';
import { QrdcanPage } from '../qrdcan/qrdcan';
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
//当页面加载的时候触发，仅在页面创建的时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发
ionViewDidLoad(){
  var that=this
  var url='http://appv2.situojinfu.com/index/index/index'
  this.storage.get('user').then((val) =>{//读取登录后的用户数据
    var valj=JSON.parse(val).id //读取用户登录里面存下来的ID
    that.user_id=valj //让此页面拿到的userID等于从登陆存起来的ID
    this.http.post(url,{user_id:that.user_id},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
      // this.http.post(url,{user_id:2941},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      that.totalBorrow=res.data.totalBorrow//总数据
      that.totalLend=res.data.totalLend//总数据
     that.apps['shou']=res.data.borrowList//当前收到的数据对应
     that.apps['fa']=res.data.lendList//当前发出的数据对应
    //  that.apps['userInfo']=res.data.userInfo
     console.log(that.apps)
    })
  })
  
}


  getItems(type: any) {
    return this.apps[type];
  }


  doRefresh(refresher: Refresher) {
    var that=this
    var url='http://appv2.situojinfu.com/index/index/index'
    this.http.post(url,{user_id:this.user_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
     that.apps['shou']=res.data.borrowList
     that.apps['fa']=res.data.lendList
    })
         console.log('Begin async operation', refresher);
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }
    



    toLiabilities(id){
      console.log(id)
      this.navCtrl.push(LiabilitiesPage,{
        user_id:id//带着id跳到征信的页面 绑定ID
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
}
