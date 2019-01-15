import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DaishouPage} from '../../pages/daishou/daishou';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx';
import { BaseUI } from '../../baseUI/baseUI';
/**
 * Generated class for the ZhanqiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-zhanqi',
  templateUrl: 'zhanqi.html',
})
export class ZhanqiPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
 public  time:any;
 public curtime:any;
public duringdays:any;
public agreement:any;
public brate:any;
public order_id:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     public storage:Storage,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController) {
       super()
  }

  ionViewDidLoad() {
    this.time = new Date(new Date().getTime()+8*60*60*1000).toISOString().slice(0,10);
    this.curtime = this.time
   this.order_id=this.navParams.get('order_id')
  }
  calculateTime(offset: any) {

    let d = new Date();

    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }
  stdTimezoneOffset(today: any) {
    let jan = new Date(today.getFullYear(), 0, 1);
    let jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  dst(today: any) {
    return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
  }


  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.time!==undefined){
   var  para=new Date(this.time.replace(/-/g,'/'))
   var curtime=new Date()
   var during=para.getTime()-curtime.getTime()
    this.duringdays=Math.ceil(during / (1000 * 60 * 60 * 24))+1
    }
    
  }

  ToDaishou(){
    if(this.time!==undefined&&this.brate!==undefined&&this.agreement==true){
      var that=this
      var url='http://yellow.situojinfu.com/index/order/zhanqiInterest'
      this.http.post(url,{order_id:this.order_id,zhanqi_time:this.time,interest:this.brate},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.fns(res.message)
      })
    }else{
      super.showToast(this.toastCtrl,'请填写完整...')
    }
  }


  fns(msg){
    var loading=super.showLoading(this.loadingCtrl,'提交展期中...')
    if(msg=='展期成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      this.navCtrl.popToRoot()
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }
}
