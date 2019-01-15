import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ZhanqiPage} from '../../pages/zhanqi/zhanqi';
import { BaseUI } from "../../baseUI/baseUI";
import { DaishouPage } from "../../pages/daishou/daishou";
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/Rx'
/**
 * Generated class for the HexiaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-hexiao',
  templateUrl: 'hexiao.html',
})
export class HexiaoPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;;
  public order_id:any;
  public str:any;
  public is_back:any;

  public infoLength:any;
  public info:any;
  private time:any;

public mobile:any;
public name:any;
public over_days:any;

public create_time:any;
public back_date:any;
public back_money:any;
public money:any;

public deal_info:any;


public hintshow=false;
public showMima=false;
public psd:any;

  public status:any;

  constructor(public navCtrl: NavController,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public navParams: NavParams,
    public http:Http,
    public storage:Storage) {
    super()
  }
  ngAfterContentChecked(): void {
    
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
        var url='http://yellow.situojinfu.com/index/order/orderDetail'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          that.name=info.borrowInfo.name
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
        var url2='http://yellow.situojinfu.com/index/order/tradeRecord'
        this.http.post(url2,{lender_id:2941,borrow_id:184},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          var info = res.data;
          that.infoLength = info.length
          if(info.length >0){
           for( var i in res.data){
            that.info = res.data[i].info;
            that.time = res.data[i].time;
           }
          } else {
          }
         
        })

      }else if(this.str=='展期已确认'){
        var url='http://yellow.situojinfu.com/index/order/zhanqiDetail'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          that.name=info.borrowInfo.name
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
        var url='http://yellow.situojinfu.com/index/order/waitZhanqi'
        this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
          console.log(res)
          var info=res.data
          that.name=info.borrowInfo.name
          that.back_date=info.order.back_date
          that.back_money=info.order.back_money
          that.create_time=info.order.create_time
          that.money=info.order.money
          that.over_days=info.order.over_days
          if(info.order.log_detail!==null){
            that.deal_info=JSON.parse(info.order.log_detail)
          }
        })
      }else if(this.str=='冻结'){
      }
    }else{
      var url='http://yellow.situojinfu.com/index/order/orderDetail'
      this.http.post(url,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)
        var info=res.data
        that.name=info.borrowInfo.name
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


  ionViewDidLoad() {
    //console.log('ionViewDidLoad HexiaoPage');
    if(this.navParams.get('yizhan') == true){
      this.status = 1
    } else {
      this.status = 2
    }
  }
  Tozhanqi(){
    this.navCtrl.push(ZhanqiPage,{
      order_id:this.order_id
    })
  }


  hint(){
    this.hintshow=true;
  }
  dismisshint(){
    this.hintshow=false;
  }

  showmima(){
    this.hintshow=false;
this.showMima=true;
var t=setTimeout(function(){
  var ipt=document.getElementById('ipt') as HTMLInputElement
  ipt.focus()
},500)
  }

  hidemima(){
    this.showMima=false;
  }



check(){
  var that=this
  if(this.psd!==undefined){
    if(this.psd.length==6){
      var ipt=document.getElementById('ipt') as HTMLInputElement
      ipt.blur()
 var url='http://yellow.situojinfu.com/index/order/hexiaoOrder'
 this.storage.get('user').then((val) =>{
  var valj=JSON.parse(val).id
  that.user_id=valj
  that.http.post(url,{user_id:that.user_id,order_id:that.order_id,password:that.psd},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
    // this.http.post(url,{user_id:2941},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
    console.log(res)
    that.fns(res.message)
  })
})
    }
  }
}


fns(msg){
  var loading=super.showLoading(this.loadingCtrl,'正在验证密码...')
  if(msg=='核销成功'){
    super.showToast(this.toastCtrl,msg)
    loading.dismiss()
    this.navCtrl.popToRoot();
  }else{
    super.showToast(this.toastCtrl,msg)
    loading.dismiss()
  }
}
}
