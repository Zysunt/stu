import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { AddCreditPage } from '../add-credit/add-credit';
import { BaseUI } from '../../baseUI/baseUI';
import { DealCompletePage } from '../deal-complete/deal-complete';

/**
 * Generated class for the TransaccountDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaccount-detail',
  templateUrl: 'transaccount-detail.html',
})
export class TransaccountDetailPage extends BaseUI{
  public psd:any;
  public showMima=false;
  public money:any;
public name='天天'
public tel='151****0102';
public pay_ways:any='账户余额';
public yue=3.14;
public credit_lastnum=1234;
public account_yue=3.14
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl:ActionSheetController,
     public platform:Platform,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController) {
       super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaccountDetailPage');
    this.tel=this.navParams.get('tel_msg')
  }


  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: '选择付款方式',
      cssClass:'ts-detail-action',
      buttons: [
        {
          text: '建设银行 储蓄卡('+this.credit_lastnum+')',
          cssClass:'actionsheet-font',
          icon:'act-act1',
          handler: () => {
            this.pay_ways='建设银行 储蓄卡('+this.credit_lastnum+')'
          }
        },{
          text: '添加银行卡',
          cssClass:'actionsheet-font',
          icon:'act-act2',
          handler: () => {
            this.navCtrl.push(AddCreditPage)
          }
        },{
          text: '余额支付 账户余额('+this.account_yue+')',
          cssClass:'actionsheet-font',
          icon:'act-act3',
          handler: () => {
            this.pay_ways='余额支付'
          }
        }
      ]
    });
    actionSheet.present();
  }


  hidemima(){
    this.showMima=false;
  }
  showmima(){
    if(this.money!=undefined){
      this.showMima=true;
      var t=setTimeout(function(){
        var ipt=document.getElementById('ipt') as HTMLInputElement
        ipt.focus()
      },500)
    }else{
      super.showToast(this.toastCtrl,'请输入转账金额...')
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
          this.navCtrl.push(DealCompletePage)
          this.showMima=false;
        
        }else{
          loading.dismiss()
          super.showToast(this.toastCtrl,'密码错误，请重试...')
        }
        this.psd=''
      }
    }
  }


  swipeEvent(e){
    this.navCtrl.pop()
    console.log('swipeleft')
  }
  
}
