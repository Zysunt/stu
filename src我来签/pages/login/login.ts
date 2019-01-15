import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams,ToastController,Content, LoadingController } from 'ionic-angular';
import { ForgetPage} from '../../pages/forget/forget';
import { RegisterPage} from '../../pages/register/register';
import { TabsPage} from '../../pages/tabs/tabs';
// import {Http,Headers,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import { BaseUI } from '../../baseUI/baseUI';
import { Http, Jsonp } from '@angular/http';
import {InAppBrowser} from '@ionic-native/in-app-browser'



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  telNum:any=18851433701;
  password:any=123456;
  arr = new Array("18245126321","123456");
  list = {}

  @ViewChild(Content) content:Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    public storage:Storage,
    public http:Http,
    public jsonp:Jsonp,
    public iab:InAppBrowser
    ) {
      super()
      
  }

ionViewDidEnter(){
  // alert('13:18')
}

ngAfterContentChecked(): void {
  //Called after every check of the component's or directive's content.
  //Add 'implements AfterContentChecked' to the class.
  // console.log(JSON.stringify(this.password))
}

  
  toHome(){

    var myreg=/^1[3456789]\d{9}$/;
    
    if(this.telNum == undefined){
      super.showToast(this.toastCtrl,'电话号码不能为空')
    } else if (!myreg.test(this.telNum)){
      super.showToast(this.toastCtrl,"电话号码不正确");
    } else if(this.password ==undefined){
      super.showToast(this.toastCtrl,'密码不能为空')
    } 
  
     else
      {
      var that=this
      var url='http://yellow.situojinfu.com/index/login/login'
      // var loading=super.showLoading(this.loadingCtrl,'提交中...')
      this.http.post(url,{mobile:this.telNum,password:this.password},{headers:this.headers}).map(res =>res.json()).subscribe(res =>{
console.log(res)
this.storage.set('user',JSON.stringify(res.data)).then((val) =>{
  that.fns(res.message)
})
        
      })
      //   loading.dismiss();
      // this.navCtrl.setRoot(TabsPage);
    }

   
  }

  fns(msg){
    var loading=super.showLoading(this.loadingCtrl,'登录中...')
    if(msg=='登录成功'){    
        super.showToast(this.toastCtrl,msg)
        loading.dismiss()
        this.navCtrl.setRoot(TabsPage);
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }

  toRegister(){
    var that=this
  var url='http://yellow.situojinfu.com/index/finance/changemoney?'+'order_id='+22
    // this.navCtrl.push(RegisterPage)
    const browser=this.iab.create(url);
      browser.on('loadstart').subscribe(event =>{
       alert('loadstart')
      })
      browser.on('loadstop').subscribe(event =>{
        alert('loadstop')
      })
      browser.on('exit').subscribe(event =>{
        alert('exit')
        that.navCtrl.push(RegisterPage)
      })
    browser.show()
  }

  tofogten(){
    this.navCtrl.push(ForgetPage)
  }


}
