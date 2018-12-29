import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Content } from 'ionic-angular';
import {ZhengxinPage} from '../zhengxin/zhengxin';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the ShimingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shiming',
  templateUrl: 'shiming.html',
})
export class ShimingPage extends BaseUI{
  @ViewChild(Content) content:Content
public imgzheng:any;
public imgfan:any;
public imgsc:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl:ActionSheetController,
     public camera:Camera,
     public toastCtrl:ToastController) {
       super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShimingPage');
    console.log(this.imgzheng)
  }


  tozhengxin(){
    this.navCtrl.push(ZhengxinPage)
  }
  scrollTo(){
    window.addEventListener('native.keyboardshow',(e:any)=>{
      this.content.scrollTo(0,e.keyboardHeight);
    })
  }


  // 预览图片
text1(sourceType){
  const options: CameraOptions = {
  quality: 100,
  sourceType: sourceType,
  saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
correctOrientation: true, //是否纠正拍摄的照片的方向
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  allowEdit:false,
  }
  this.camera.getPicture(options).then((imagepath) => {
  // imageData is either a base64 encoded string or a file URI
  // If it's base64 (DATA_URL):
  let base64Image = 'data:image/jpeg;base64,' + imagepath;
  this.imgzheng=base64Image;
  alert('图片加载成功')
  }, (err) => {
  // Handle error
  super.showToast(this.toastCtrl,'选择图片出现错误，请在 App 中操作或检查相关权限。')
  });
  }

  // 选择上传方式
  presentActionSheet1() {
    const actionSheet = this.actionSheetCtrl.create({
      title: '选择图片获取方式',
      buttons: [
        {
          text: '从图库中选择',
          handler: () => {
            this.text1( this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },{
          text: '使用相机',
          handler: () => {
            this.text1(this.camera.PictureSourceType.CAMERA)
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }


  text2(sourceType){
    const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
  correctOrientation: true, //是否纠正拍摄的照片的方向
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit:false,
    }
    this.camera.getPicture(options).then((imagepath) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imagepath;
    this.imgfan=base64Image;
    alert('图片加载成功')
    }, (err) => {
    // Handle error
    super.showToast(this.toastCtrl,'选择图片出现错误，请在 App 中操作或检查相关权限。')
    });
    }
  
    // 选择上传方式
    presentActionSheet2() {
      const actionSheet = this.actionSheetCtrl.create({
        title: '选择图片获取方式',
        buttons: [
          {
            text: '从图库中选择',
            handler: () => {
              this.text2( this.camera.PictureSourceType.PHOTOLIBRARY)
            }
          },{
            text: '使用相机',
            handler: () => {
              this.text2(this.camera.PictureSourceType.CAMERA)
            }
          },{
            text: '取消',
            role: 'cancel',
            handler: () => {
              
            }
          }
        ]
      });
      actionSheet.present();
    }


    text3(sourceType){
      const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
    correctOrientation: true, //是否纠正拍摄的照片的方向
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:false,
      }
      this.camera.getPicture(options).then((imagepath) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imagepath;
      this.imgsc=base64Image;
      alert('图片加载成功')
      }, (err) => {
      // Handle error
      super.showToast(this.toastCtrl,'选择图片出现错误，请在 App 中操作或检查相关权限。')
      });
      }
    
      // 选择上传方式
      presentActionSheet3() {
        const actionSheet = this.actionSheetCtrl.create({
          title: '选择图片获取方式',
          buttons: [
            {
              text: '从图库中选择',
              handler: () => {
                this.text3( this.camera.PictureSourceType.PHOTOLIBRARY)
              }
            },{
              text: '使用相机',
              handler: () => {
                this.text3(this.camera.PictureSourceType.CAMERA)
              }
            },{
              text: '取消',
              role: 'cancel',
              handler: () => {
                
              }
            }
          ]
        });
        actionSheet.present();
      }

}
