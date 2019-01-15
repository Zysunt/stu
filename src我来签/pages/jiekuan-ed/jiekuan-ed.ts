import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController,Toast,ToastController,LoadingController } from 'ionic-angular';
import { DaihuanPage} from '../../pages/daihuan/daihuan';
import { BaseUI} from '../../baseUI/baseUI';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/Rx'
/**
 * Generated class for the JiekuanEdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-jiekuan-ed',
  templateUrl: 'jiekuan-ed.html',
})
export class JiekuanEdPage extends BaseUI{
 public headers:any = new Headers({'Content-Type':'application/json'});
  public order_id:any;
  public str:any;
  public is_back:any;

  public name:any;
  public back_date:any;
  public back_money:any;
  public create_time:any;
  public money:any;
  public over_days:any;
  public deal_info:any;
  public mobile:any;
  public zhanqiDays:any;
  manName = "mskda";
  telNum = 15487876564;
  jiekuan = 12454545;
  date = "2018-12-30";
  method = "到期还本付息";
  yhuan = 4546856;
  jiechuDate = "2018-12-1";
  jiechutime = "10:10";
  chuMon = 45547574;
  jiekuanren = "nananna";
  zhanqiDay = 10;
  zhanqidate = "2018-12-30";
  public psd:any
  public satus:any;



  showMima=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public http:Http,
    public storage:Storage  ) {
      super()
  }

  ionViewWillEnter(){
    this.order_id=this.navParams.get('order_id')
    this.str=this.navParams.get('str')
    this.is_back=this.navParams.get('is_back')
  }


  ionViewDidEnter(){
    var that=this
    if(this.is_back==0){
      if(this.str=='正常'){
        var url='http://yellow.situojinfu.com/index/order/waitRepOrderDetail'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          that.name=info.lenderInfo.name
          that.mobile=info.lenderInfo.mobile
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
      }else if(this.str=='展期已确认'){
        var url='http://yellow.situojinfu.com/index/order/waitRepZhanqiDetail'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          var info=res.data
          that.name=info.lenderInfo.name
          that.mobile=info.lenderInfo.mobile
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
      }else if(this.str=='展期未确认'){
        var url='http://yellow.situojinfu.com/index/order/waitRepWaitZhanqi'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          var info=res.data
          that.name=info.lenderInfo.name
          that.mobile=info.lenderInfo.mobile
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          that.zhanqiDays=info.zhanqiDays
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
      }else if(this.str=='冻结'){
      }else{
        var url='http://yellow.situojinfu.com/index/order/waitRepOrderDetail'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          that.name=info.lenderInfo.name
          that.mobile=info.lenderInfo.mobile
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
      }
    }
  }







  ionViewDidLoad() {
    if(this.navParams.get('isShowque')==true){
      this.satus=3
    }else if(this.navParams.get('isShowz')==true){
      this.satus=2
    }else{
      this.satus=1
    }
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.psd!==undefined){
      if(this.psd.length>=6){
   var loading=super.showLoading(this.loadingCtrl,'正在验证密码...')
        if(this.psd=='123456'){
          loading.dismiss()
          super.showToast(this.toastCtrl,'验证成功,正在跳转...')
          this.navCtrl.popTo(DaihuanPage)
          this.showMima=false;
        
        }else{
          loading.dismiss()
          super.showToast(this.toastCtrl,'密码错误，请重试...')
        }
        this.psd=''
      }
    }
  }

  // 密码框
  hidemima(){
    this.showMima=false;
  }
  showmima(){
    this.showMima=true;
    var t=setTimeout(function(){
      var ipt=document.getElementById('ipt') as HTMLInputElement
      ipt.focus()
    },500)
  }
  back(){
    this.viewCtrl.dismiss()
  }
}
