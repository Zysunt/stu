import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {JietiaoDetailPage} from '../jietiao-detail/jietiao-detail';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {StatusBar} from '@ionic-native/status-bar'
import { BaseUI } from '../../baseUI/baseUI';
import {Storage} from '@ionic/storage';
import {Http,Jsonp} from '@angular/http';
import 'rxjs/Rx'
import { LoadedModule } from 'ionic-angular/umd/util/module-loader';

/**
 * Generated class for the SigningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-signing',
  templateUrl: 'signing.html',
})
export class SigningPage extends BaseUI{
  // @ViewChild('Signpad') signpad:ElementRef;
  @ViewChild('header') headerheight:ElementRef;
  public headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;
public lastX:any;
public lastY:any;
public headerH:any;
public canvasImage:any;
public isLender:boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public screenorientation:ScreenOrientation,
    public statusBar:StatusBar,
    public toastCtrl:ToastController,
    public http:Http,
    public storage:Storage,
    public loadingCtrl:LoadingController) {
      super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigningPage');
    var that=this
    this.headerH=this.headerheight.nativeElement.offsetHeight
    // this.isLender=this.navParams.get('islender')
    this.storage.get('user').then((val) =>{
      that.user_id=JSON.parse(val).id
    })
  }


  // ionViewDidEnter(){
  //   this.screenorientation.lock(this.screenorientation.ORIENTATIONS.LANDSCAPE);
  //     this.statusBar.hide();
  // }
  // ionViewDidLeave(){
  //   this.screenorientation.lock(this.screenorientation.ORIENTATIONS.PORTRAIT);
  //     this.statusBar.hide();
  // }

  handleStart(ev){
    this.lastX=ev.changedTouches[0].clientX;
    this.lastY=ev.changedTouches[0].clientY-this.headerH-16;
  }
  handleMove(ev){
    let c=document.getElementById('Signpad') as HTMLCanvasElement;
    let ctx=c.getContext('2d')
    let currentX = ev.changedTouches[0].clientX;
    let currentY = ev.changedTouches[0].clientY-this.headerH-16;
    ctx.beginPath();
    ctx.strokeStyle='red';
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
   
    ctx.stroke();      

    this.lastX = currentX;
    this.lastY = currentY;
    ctx.closePath();
  }

  clear(){
    let c=document.getElementById('Signpad') as HTMLCanvasElement;
    let ctx=c.getContext('2d')
    ctx.clearRect(0,0,c.width,c.height)
  }
  save(){
    let c=document.getElementById('Signpad') as HTMLCanvasElement;
    this.canvasImage=c.toDataURL()
    console.log(this.canvasImage)
  }


  back(){
    if(this.canvasImage==undefined){
      super.showToast(this.toastCtrl,'请先预览签名')
    }else{
      var that=this
      var url='http://appv2.situojinfu.com/index/auth/authsign'
      this.http.post(url,{user_id:this.user_id,sign_base64:this.canvasImage},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        console.log(res)
        that.fns(res.message)
      })
    }
  }


  fns(msg){
    var loading=super.showLoading(this.loadingCtrl,'提交签名中...')
    var that=this
    if(msg=='实名认证成功'){
      this.storage.get('user').then((val) =>{
        var stat=JSON.parse(val)
        stat.is_shiming=1
        that.storage.set('user',JSON.stringify(stat))
      })
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
      this.navCtrl.popToRoot()
    }else{
      super.showToast(this.toastCtrl,msg)
      loading.dismiss()
    }
  }
  
}





	