import { Component } from '@angular/core';

import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';
import {AboutPage} from '../about/about'
import { ActionSheetController, NavController, Events, ToastController } from 'ionic-angular';
import { LenderPage } from '../lender/lender';
import { JietiaoDetailPage } from '../jietiao-detail/jietiao-detail';
import {Storage} from '@ionic/storage'
import { BaseUI } from '../../baseUI/baseUI';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends BaseUI{
public isShow=false;
public is_shiming:any;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MinePage;

  constructor(public actionSheetCtrl:ActionSheetController,
    public navCtrl:NavController,
    public events:Events,
    public storage:Storage,
    public toastCtrl:ToastController
    ) {
super()
  }


  ionViewDidLoad(){
    
  }


  openmenu(){
    // var that=this
    // this.storage.get('user').then((val) =>{
    //   that.is_shiming=JSON.parse(val).is_shiming
    //   if(that.is_shiming==1){
        this.presentActionSheet()
    //   }else{
    //     super.showToast(this.toastCtrl,'请先实名')
    //   }
    // })
   
  }


  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      cssClass:'tab-tab-action',
      buttons: [
        {
          text: '出借人',
          cssClass:'tab-actionsheet',
          role:'destructive',
          handler: () => {
            this.navCtrl.push(LenderPage,{
              islender:true
            })
            // this.navCtrl.push(JietiaoDetailPage,{
            //   isLender:true
            // })
          }
        },{
          text: '借款人',
          cssClass:'tab-actionsheet',
          role:'destructive',
          handler: () => {
            this.navCtrl.push(LenderPage,{
              islender:false
            })
          }
        },{
          text: '取消',
          role:'cancle',
          cssClass:'tab-actionsheet',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();

  }
}
