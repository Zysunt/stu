import { Component } from '@angular/core';

import { MinePage } from '../mine/mine';
import { HomePage } from '../home/home';
import {AboutPage} from '../about/about'
import { ActionSheetController, NavController, Events } from 'ionic-angular';
import { LenderPage } from '../lender/lender';
import { JietiaoDetailPage } from '../jietiao-detail/jietiao-detail';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
public isShow=false
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MinePage;

  constructor(public actionSheetCtrl:ActionSheetController,
    public navCtrl:NavController,
    public events:Events) {

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
            // console.log('Archive clicked');
            this.navCtrl.push(LenderPage,{
              islender:false
            })
          }
        },{
          text: '取消',
          role:'cancle',
          cssClass:'tab-actionsheet',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }
}
