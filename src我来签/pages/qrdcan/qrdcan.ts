import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {InAppBrowser} from '@ionic-native/in-app-browser'


/**
 * Generated class for the QrdcanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-qrdcan',
  templateUrl: 'qrdcan.html',
})

export class QrdcanPage   {
  
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头

  constructor(private qrScanner: QRScanner,
    public inbrowser:InAppBrowser) {

  }



  ionViewDidLoad(){
    var that=this;
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text:string)=>{
            this.qrScanner.hide()
            scanSub.unsubscribe()
      
            if(cordova.platformId === 'android'){
              var browser=this.inbrowser.create(text,'_blank','hideurlbar=yes')
            }else if(cordova.platformId === 'ios'){
              var browser=this.inbrowser.create(text,'_blank')
            }
              browser.show()
            // that.qrScanner.hide();
            // scanSub.unsubscribe();
          });
          this.qrScanner.show();

        } else if (status.denied) {
          alert("获取权限失败");
        } else {
          alert("没有权限");
        }
      })
      .catch((e: any) =>{
        alert("调用扫描仪错误");//没有获得权限就报错
        alert(e)
      });
  }

  ionViewDidEnter(){
    //页面可见时才执行
    this.showCamera();//开始透明化ion-app
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');//写在全局样式表中，对ion-app进行透明化
  }
  hideCamera() {
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');//取消ion-app透明化
    this.qrScanner.hide()
    this.qrScanner.destroy()
  }

  ionViewWillLeave() {
    this.hideCamera();//离开页面也要关闭相机调用
  }



  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {

    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }



}
