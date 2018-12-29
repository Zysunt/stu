import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SigningPage } from '../signing/signing';
import { BaseUI } from '../../baseUI/baseUI';
import { RestProvider } from '../../providers/rest/rest';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx';
import { JietiaoDetailPage } from '../jietiao-detail/jietiao-detail';

/**
 * Generated class for the LenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lender',
  templateUrl: 'lender.html',
})
export class LenderPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public username:any='123';
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

// 借款人
public bloan_money:any;
public bback_time:any;
public brate:any;
public lender_name:any;
public purpose:any;
public bduringdays:any;
public agreeserve:any;

public benxi:number;
public benxi2:number;
public hintshow=false;
public isLender:boolean;
public service_money=10;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController,
     public rest:RestProvider,
     public storage:Storage,
     public http:Http
     ) {
       super()
  }

  ionViewDidLoad() {
    this.selectOptions = {
      title: '请选择实际资金用途',
      subTitle: '禁止用于购房、投资、及各种非消费场景',
    };
    console.log('ionViewDidLoad LenderPage');
this.isLender=this.navParams.get('islender')
this.curtime=new Date(new Date().getTime()+8*60*60*1000).toISOString();
console.log(this.curtime)
console.log(this.curtime.slice(11,19))
console.log(this.isLender)
this.storage.get('user').then((val) =>{
this.user_id=JSON.parse(val).id
})
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
    if(this.lloan_money!==undefined&&this.lrate!==undefined){
      this.benxi=Math.ceil(this.lloan_money+this.lloan_money*this.lrate*this.lduringdays/36500)
    }
    if(this.bloan_money!==undefined&&this.brate!==undefined){
      this.benxi2=Math.ceil(this.bloan_money+this.bloan_money*this.brate*this.bduringdays/36500)
    }
    if(this.lback_time!==undefined){
      // this.time=JSON.stringify(this.time)
   var  para=new Date(this.lback_time.replace(/-/g,'/'))
   var currtime=new Date()
   var during=para.getTime()-currtime.getTime()
    this.lduringdays=Math.ceil(during / (1000 * 60 * 60 * 24))+1
    }
    if(this.bback_time!==undefined){
      // this.time=JSON.stringify(this.time)
   var  para=new Date(this.bback_time.replace(/-/g,'/'))
   var currtime=new Date()
   var during=para.getTime()-currtime.getTime()
    this.bduringdays=Math.ceil(during / (1000 * 60 * 60 * 24))+1
    }


    // if(this.lender_name!==undefined){
    //   if(this.lender_name.length==11){
    //     this.sss()
    //   }
    // }
  }

  hint(){
    console.log(this.isLender)
    if( (this.lloan_money!==undefined&&this.lback_time!==undefined&&this.lrate!==undefined&&this.borrower_name!==undefined) || 
    (this.bloan_money!==undefined&&this.bback_time!==undefined&&this.brate!==undefined&&this.lender_name!==undefined&&this.purpose!==undefined&&this.agreeserve==true) ){
      this.hintshow=true;
    }else{
      super.showToast(this.toastCtrl,'请填写完整...')
    }
  }
  dismisshint(){
    this.hintshow=false;
  }
  tosigning(){
    var that=this
    if(this.isLender){
      var lend_list={
        islender:this.isLender,
        username:this.username,
        lloan_money:this.lloan_money,
        lback_time:this.lback_time,
        lrate:this.lrate,
        borrower_name:this.borrower_name
      }
      this.storage.set('lend_list',JSON.stringify(lend_list))
    }
    else{
      var borrow_list={
        islender:this.isLender,
        username:this.username,
        bloan_money:this.bloan_money,
        bback_time:this.bback_time,
        brate:this.brate,
        purpose:this.purpose,
        lender_name:this.lender_name
      }
      this.storage.set('borrow_list',JSON.stringify(borrow_list))
    }
    this.hintshow=false;
    var url='http://appv2.situojinfu.com/index/lender/createOrder'
    
    this.http.post(url,{user_id:this.user_id,borrow_name:this.borrower_name,money:this.lloan_money,interest:this.lrate,back_time:this.lback_time},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      that.fns(res.message)
      // that.storage.set('')
    })
    // this.navCtrl.push(SigningPage,{
    //   islender:this.isLender
    // })
  }



  fns(msg){
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
   
  var l=this.lender_name.length
  console.log(l)
   if(l==11){
    
      var that = this
      var url='http://appv2.situojinfu.com/index/tool/getBorrowByMobile'
      this.http.post(url,{mobile:this.lender_name},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)
        that.fns2(res.code,res.message,res.data.name)
      })
    }else{
      super.showToast(this.toastCtrl,'手机号不正确')
    }
   
 }
 sss1(){
  var l=this.borrower_name.length
  console.log(l)
   if(l==11){
    
      var that = this
      var url='http://appv2.situojinfu.com/index/tool/getBorrowByMobile'
      this.http.post(url,{mobile:this.borrower_name},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)
        that.fns2(res.code,res.message,res.data.name)
      })
    }else{
      super.showToast(this.toastCtrl,'手机号不正确')
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
