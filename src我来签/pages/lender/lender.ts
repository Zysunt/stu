import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SigningPage } from '../signing/signing';
import { BaseUI } from '../../baseUI/baseUI';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx';
import { JietiaoDetailPage } from '../jietiao-detail/jietiao-detail';
import {InAppBrowser} from '@ionic-native/in-app-browser'

/**
 * Generated class for the LenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lender',
  templateUrl: 'lender.html',
})
export class LenderPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public username:any;
  public name:any;
  public curtime:any;
  public selectOptions:any;
  public user_id:any;
//出借人
public lloan_money:any;
public lback_time:any;
public lrate:any;
public borrower_name:any;
public lduringdays:any;
public borrower_id:any;
public llixi:any;
public chujielixi:any;

// 借款人
public bloan_money:any;
public bback_time:any;
public brate:any;
public lender_name:any;
public purpose:any;
public bduringdays:any;
public agreeserve:any;
public lender_id:any;
public blixi:any;
public jiekuanlixi:any;

public benxi:number;
public benxi2:number;
public hintshow=false;
public isLender:boolean;
public service_money=10;

public order_id:any;
public usertel:any;
public idcard:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController,
     public storage:Storage,
     public http:Http,
     public browser:InAppBrowser
     ) {
       super()
  }

  ionViewDidLoad() {
    var that=this
    this.storage.get('user').then((val) =>{
      that.username=JSON.parse(val).name
      that.usertel=JSON.parse(val).mobile
      that.idcard=JSON.parse(val).idcard
    })
    this.selectOptions = {
      title: '请选择实际资金用途',
      subTitle: '禁止用于购房、投资、及各种非消费场景',
    };

this.isLender=this.navParams.get('islender')
this.curtime=new Date(new Date().getTime()+8*60*60*1000).toISOString();
this.storage.get('user').then((val) =>{
this.user_id=JSON.parse(val).id
})
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    if(this.lloan_money!==undefined&&this.lrate!==undefined){
      var lixistr = this.lloan_money*this.lrate*this.lduringdays/36500;
    var xiabiao=JSON.stringify(lixistr).indexOf('.')
    this.chujielixi =Number(JSON.stringify(lixistr).slice(0,xiabiao+3)) //出借利息
    this.benxi=this.lloan_money+this.chujielixi
    }
    if(this.bloan_money!==undefined&&this.brate!==undefined){
      var lixistr = this.bloan_money*this.brate*this.bduringdays/36500;
    var xiabiao=JSON.stringify(lixistr).indexOf('.')
    this.jiekuanlixi =Number(JSON.stringify(lixistr).slice(0,xiabiao+3)) //出借利息
    this.benxi2=this.bloan_money+this.jiekuanlixi
    }
    if(this.lback_time!==undefined){
   var  para=new Date(this.lback_time.replace(/-/g,'/'))
   var currtime=new Date()
   var during=para.getTime()-currtime.getTime()
    this.lduringdays=Math.ceil(during / (1000 * 60 * 60 * 24))+1
    }
    if(this.bback_time!==undefined){
   var  para=new Date(this.bback_time.replace(/-/g,'/'))
   var currtime=new Date()
   var during=para.getTime()-currtime.getTime()
    this.bduringdays=Math.ceil(during / (1000 * 60 * 60 * 24))+1
    }
  }

  hint(){
    if( (this.lloan_money!==undefined&&this.lback_time!==undefined&&this.lrate!==undefined&&this.borrower_name!==undefined&&/^1[3456789]\d{9}$/.test(this.borrower_name)&&this.name!==null) || 
    (this.bloan_money!==undefined&&this.bback_time!==undefined&&this.brate!==undefined&&this.lender_name!==undefined&&this.purpose!==undefined&&this.agreeserve==true&&/^1[3456789]\d{9}$/.test(this.lender_name)&&this.name!==null) ){
      if(this.usertel==this.borrower_name || this.lender_name==this.usertel){
        super.showToast(this.toastCtrl,'发送对象不能为自己')
      }else{
        this.hintshow=true;
      }
    }
    else{
      super.showToast(this.toastCtrl,'请填写完整...')
    }
  }
  dismisshint(){
    this.hintshow=false;
  }
  tosigning(){
    
    var that=this
    if(this.isLender){
      
      var url='http://yellow.situojinfu.com/index/lender/createOrder'
    
    this.http.post(url,{user_id:this.user_id,borrow_name:this.borrower_name,money:this.lloan_money,interest:this.lrate,back_time:this.lback_time,borrow_id:this.borrower_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      that.fnsl(res.message)
      var lend_list={
        islender:that.isLender,
        username:that.username,
        lloan_money:that.lloan_money,
        lback_time:that.lback_time,
        lrate:that.lrate,
        borrower_name:that.name,
        order_id:res.data.order_id,
        lenderIdcard:that.idcard
      }
      that.storage.set('lend_list',JSON.stringify(lend_list))
    })
    }
    else{
      var that=this
      // 生成order_id
      var url='http://yellow.situojinfu.com/index/borrow/borrowCreate'
      // 支付页面
      // var url2='http://yellow.situojinfu.com/index/finance/changemoney?'+'user_id='+this.user_id+'&lender_name='+this.lender_name+'&money='+this.bloan_money+'&interest='+this.brate+'&back_time='+this.bback_time+'&lender_id='+this.lender_id+'&application='+this.purpose
      var url2='http://yellow.situojinfu.com/index/finance/changemoney?'+'order_id='+this.order_id
      var url3='http://yellow.situojinfu.com/index/tool/isPay'
     
      // browser.on('loadstop').subscribe(event =>{
        // console.log('loadstop')
    
        that.http.post(url,{user_id:that.user_id,lender_name:that.lender_name,money:that.bloan_money,interest:that.brate,back_time:that.bback_time,lender_id:that.lender_id,application:that.purpose},{headers:that.headers}).map(res =>res.json()).subscribe(res =>{
          that.order_id=res.data.order_id
          var borrow_list={
            islender:that.isLender,
            username:that.username,
            bloan_money:that.bloan_money,
            bback_time:that.bback_time,
            brate:that.brate,
            lender_name:that.name,
            order_id:res.data.order_id,
            lenderIdcard:res.data.lenderIdcard
          }
          that.storage.set('borrow_list',JSON.stringify(borrow_list)).then((val) =>{
            that.fns(res.message)
          })
          
        })
      // })

    

     
    // this.http.post(url,{user_id:this.user_id,lender_name:this.lender_name,money:this.bloan_money,interest:this.brate,back_time:this.bback_time,lender_id:this.lender_id,application:this.purpose},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
    //   that.fns(res.message)
    //   var borrow_list={
    //     islender:that.isLender,
    //     username:that.username,
    //     bloan_money:that.bloan_money,
    //     bback_time:that.bback_time,
    //     brate:that.brate,
    //     lender_name:that.name,
    //     order_id:res.data.order_id
    //   }
    //   that.storage.set('borrow_list',JSON.stringify(borrow_list))
    // })
    
    }
    this.hintshow=false;

  }



  fns(msg){
    var url2='http://yellow.situojinfu.com/index/finance/changemoney?'+'order_id='+this.order_id
    var url3='http://yellow.situojinfu.com/index/tool/isPay'
    var loading=super.showLoading(this.loadingCtrl,'借条生成中...')
    if(cordova.platformId === 'android'){
      var browser=this.browser.create(url2,'_blank','hideurlbar=yes')
    }else if(cordova.platformId === 'ios'){
      var browser=this.browser.create(url2,'_blank')
    }
    if(msg=='操作成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      browser.on('exit').subscribe(event =>{
        this.http.post(url3,{order_id:this.order_id},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
          if(res.data.is_pay==1){
            
            this.navCtrl.push(JietiaoDetailPage,{
        isLender:this.isLender
      });
          }
        })
      })
    browser.show()

      // this.navCtrl.push(JietiaoDetailPage,{
      //   isLender:this.isLender
      // });
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }

  
  fnsl(msg){
    var loading=super.showLoading(this.loadingCtrl,'借条生成中...')
    if(msg=='操作成功'){
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
        

      this.navCtrl.push(JietiaoDetailPage,{
        isLender:this.isLender
      });
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }


 sss(){
   
  if(this.lender_name!==undefined){
    var l=this.lender_name.length
   if(l==11){ 
      var that = this
      var url='http://yellow.situojinfu.com/index/tool/getBorrowByMobile'
      this.http.post(url,{mobile:this.lender_name},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.lender_id=res.data.id
        that.fns2(res.code,res.message,res.data.name)
      })
    }else{
      super.showToast(this.toastCtrl,'手机号不正确')
    }
  }
   
 }
 sss1(){
  if(this.borrower_name!==undefined){
    var l=this.borrower_name.length
   if(l==11){
    
      var that = this
      var url='http://yellow.situojinfu.com/index/tool/getBorrowByMobile'
      this.http.post(url,{mobile:this.borrower_name},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        that.borrower_id=res.data.id
        that.fns2(res.code,res.message,res.data.name)
      })
    }else{
      super.showToast(this.toastCtrl,'手机号不正确')
    }
  }
   
 }
  

 fns2(code,msg,name){
  var loading=super.showLoading(this.loadingCtrl,'搜索中...')
  if(code==200){
    super.showToast(this.toastCtrl,msg)
    this.name=name
    loading.dismiss()
  }else{
    super.showToast(this.toastCtrl,msg)
    loading.dismiss()
  }
}


 
}
