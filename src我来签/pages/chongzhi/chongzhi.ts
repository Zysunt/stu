import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddCreditPage } from '../add-credit/add-credit';

/**
 * Generated class for the ChongzhiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chongzhi',
  templateUrl: 'chongzhi.html',
})
export class ChongzhiPage {
  public money='1000';
  public card_type='建设银行储蓄卡';
  public card_num='0174';
  public isqueren=false;
  public choosecard=false;

  public buttons=[
    {
          text: '建设很行 储蓄卡('+this.card_num+')',
          cssClass:'actionsheet-font',
          icon:'act-act1',
          handler: () => {
            this.card_type='建设银行 储蓄卡'
            this.card_num='1234'
            console.log('建设很行')
          }
        },
        {
          text: '农业很行 储蓄卡('+this.card_num+')',
          cssClass:'actionsheet-font',
          icon:'act-act1',
          handler: () => {
            this.card_type='农业很行 储蓄卡'
            this.card_num='4321'
            console.log('农业很行')
          }
        },{
          text: '添加银行卡',
          cssClass:'actionsheet-font',
          icon:'act-act2',
          handler: () => {
            this.navCtrl.push(AddCreditPage)
          }
        }
  ];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChongzhiPage');
  }

  presentActionSheet() {

    const actionSheet = this.actionSheetCtrl.create({
      title: '选择付款方式',
      cssClass:'ts-detail-action',
      buttons:this.buttons
      // buttons: [
      //   {
      //     text: '建设银行 储蓄卡('+this.card_num+')',
      //     cssClass:'actionsheet-font',
      //     icon:'act-act1',
      //     handler: () => {
      //       this.pay_ways='建设银行 储蓄卡('+this.card_num+')'
      //     }
      //   },{
      //     text: '添加银行卡',
      //     cssClass:'actionsheet-font',
      //     icon:'act-act2',
      //     handler: () => {
      //       this.navCtrl.push(AddCreditPage)
      //     }
      //   }
      // ]
    });
    actionSheet.present();
  }

  showqueren(){
    this.isqueren=true;
  }

  hide(){
    if(this.isqueren==true&&this.choosecard==true){
      this.choosecard=false
    }else if(this.isqueren==true){
      this.isqueren=false;
    }
  }
}
