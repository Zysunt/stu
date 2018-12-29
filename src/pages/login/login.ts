import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Content, LoadingController } from 'ionic-angular';
import { ForgetPage} from '../../pages/forget/forget';
import { RegisterPage} from '../../pages/register/register';
import { TabsPage} from '../../pages/tabs/tabs';
// import {Http,Headers,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import { BaseUI } from '../../baseUI/baseUI';
import { Http, Jsonp } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    
    ) {
      super()
      
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
    // else if(JSON.stringify(this.password).length<6){
    //   super.showToast(this.toastCtrl,'密码不能小于6位')

    // }
     else
      {
      //临时变量that
      var that=this //当前的this对象复制一份到that变量中 this对象在程序中随时会改变 that没改变之前仍然是指向当时的this
      var url='http://appv2.situojinfu.com/index/login/login';// 后台请求地址
      var loading=super.showLoading(this.loadingCtrl,'提交中...')
      //post传值 mobile password 后台定义的变量  地址 url  参数{mobile:this.telNum,password:this.password}  请求头{headers:this.headers}
      this.http.post(url,{mobile:this.telNum,password:this.password},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)//拿到的数据
        that.storage.set('user',JSON.stringify(res.data))//登录存用户数据
        that.fns(res.message)//自定义函数 用之前的this指向这个函数fns
      })
        loading.dismiss();//关闭loading界面
      this.navCtrl.setRoot(TabsPage);//设置根页面
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
    this.navCtrl.push(RegisterPage)
  }

  tofogten(){
    this.navCtrl.push(ForgetPage)
  }
}
