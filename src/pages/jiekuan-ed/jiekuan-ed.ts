import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Toast,ToastController,LoadingController } from 'ionic-angular';
import { DaihuanPage} from '../../pages/daihuan/daihuan';
import { BaseUI} from '../../baseUI/baseUI';
/**
 * Generated class for the JiekuanEdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jiekuan-ed',
  templateUrl: 'jiekuan-ed.html',
})
export class JiekuanEdPage extends BaseUI{
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
    public toastCtrl:ToastController  ) {
      super()
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JiekuanEdPage');
    if(this.navParams.get('isShowque')==true){
      this.satus=3
    }else if(this.navParams.get('isShowz')==true){
      this.satus=2
    }else{
      this.satus=1
    }
    // console.log( this.satus);
    // console.log(this.navParams.get('isShowque'))
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
