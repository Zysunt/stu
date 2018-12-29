import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BaseUI } from '../../baseUI/baseUI';
import {TransaccountDetailPage} from '../transaccount-detail/transaccount-detail'

/**
 * Generated class for the TransaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaccount',
  templateUrl: 'transaccount.html',
})
export class TransaccountPage extends BaseUI{
  public rec_tel:any;
public nearly_friends=[
  {
    headface:'assets/imgs/zhuanzhang/pic.png',
name:'天天',
tel:'151****0102'
},
{
  headface:'assets/imgs/zhuanzhang/pic.png',
  name:'汪洋',
  tel:'151****0102'
  },
  {
    headface:'assets/imgs/zhuanzhang/pic.png',
    name:'陈皮',
    tel:'151****0102'
    },
    {
      headface:'assets/imgs/zhuanzhang/pic.png',
      name:'夏阳',
      tel:'151****0102'
      },
]
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtrl:ToastController) {
       super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaccountPage');
  }

  next(){
    if(!(/^1[34578]\d{9}$/.test(this.rec_tel))){
       super.showToast(this.toastCtrl,'请输入正确手机号...')
    }else{
      var tel_msg=this.rec_tel.slice(0,3)+'****'+this.rec_tel.slice(7)
      this.navCtrl.push(TransaccountDetailPage,
        {
          tel_msg:tel_msg
        })
    }
  }
}
