import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,Toast,LoadingController,Loading, ViewController} from 'ionic-angular';
import {BaseUI} from '../../baseUI/baseUI';
import { HomePage} from '../../pages/home/home'
/**
 * Generated class for the LendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lended',
  templateUrl: 'lended.html',
})
export class LendedPage extends BaseUI {
  public lend_list:any;
  public borrow_list:any;
  
  public lender='asdas';
  public identity_num='23123123232323'
  public money_num='10';
  public money_ch='十元';
  public interest='20';
  public backtime='2018-10-10';
  public purpose='日常消费';
  public borrower='dsdwe';
  public lender_tel='123456789012';
  public isLender:boolean;
  showMima = false;
  psd:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public viewCtrl:ViewController,
) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LendedPage');
  }
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

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.psd!=undefined){
      if(this.psd.length>=6){
   var loading=super.showLoading(this.loadingCtrl,'正在验证密码...')
        if(this.psd=='123456'){
          loading.dismiss()
          super.showToast(this.toastCtrl,'验证成功,正在跳转...')
          this.navCtrl.popToRoot()
          this.showMima=false;
        
        }else{
          loading.dismiss()
          super.showToast(this.toastCtrl,'密码错误，请重试...')
        }
        this.psd=''
      }
    }
  }

  // 数字转中文
  SectionToChinese(section){
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitSection = ["","万","亿","万亿","亿亿"];
    var chnUnitChar = ["","十","百","千"];
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}

  back(){
    this.viewCtrl.dismiss();
  }
}
