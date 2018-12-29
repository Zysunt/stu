import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { ConfirmPage } from '../confirm/confirm';
import {Storage} from '@ionic/storage';
import { LendInfoPage } from "../../pages/lend-info/lend-info";
import { FukuanPage } from "../../pages/fukuan/fukuan";

/**
 * Generated class for the JietiaoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jietiao-detail',
  templateUrl: 'jietiao-detail.html',
})
export class JietiaoDetailPage {
public lend_list:any;
public borrow_list:any;

public lender='刘怡';
public identity_num='23123123232323'
public money_num='10';
public money_ch='十元';
public interest='20';
public backtime='2018-10-10';
public purpose='日常消费';
public borrower='咦刘';
public lender_tel='123456789012';
public isLender:boolean;
// 签名地址
public lsignImage:any;
public bsignImage:any;
public isDel=false;
public isSend=false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public storage:Storage
    ) {
  }

  //阿拉伯数字转中文


  ionViewDidLoad() {


    var that=this
    console.log('ionViewDidLoad JietiaoDetailPage');
    this.isLender=this.navParams.get('isLender')
    console.log(this.isLender)
    this.lsignImage=this.navParams.get('lsignImage')
    this.bsignImage=this.navParams.get('bsignImage')
    if(this.isLender){
     this.storage.get('lend_list').then((val) =>{
       console.log(JSON.parse(val))
       this.lender=JSON.parse(val).username
       this.money_num=JSON.parse(val).lloan_money
       this.interest=JSON.parse(val).lrate
       this.borrower=JSON.parse(val).borrower_name
       this.backtime=JSON.parse(val).lback_time
       this.money_ch=this.toChinesNum(this.money_num)
     })
    }else{
      this.storage.get('borrow_list').then((val) =>{
        console.log(JSON.parse(val))
       this.lender=JSON.parse(val).lender_name
       this.money_num=JSON.parse(val).bloan_money
       this.interest=JSON.parse(val).brate
       this.borrower=JSON.parse(val).username
       this.backtime=JSON.parse(val).bback_time
       this.purpose=JSON.parse(val).purpose
       this.money_ch=this.toChinesNum(this.money_num)
      })
    }
  }
  ToLendInfoPage(){
    this.navCtrl.push(LendInfoPage);
  }
  back(){
    this.viewCtrl.dismiss()
  }
  FukuanPage(){
    this.navCtrl.push(FukuanPage)
  }

  send(){
    this.isSend=true
  }
  cancle(){
    this.isSend=false;
  }

  del(){
    this.isDel=true;
  }
  delif(){
    this.isDel=false;
  }

  tousers(){
    this.navCtrl.push(UsersPage)
  }

  toconfirm(){
    this.navCtrl.push(ConfirmPage)
  }



  // 数字转中文
//   SectionToChinese(section){
//     var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
//     var chnUnitSection = ["万","亿","万亿","亿亿"];
//     var chnUnitChar = ["十","百","千"];
//     var strIns = '', chnStr = '';
//     var unitPos = 0;
//     var zero = true;
//     while(section > 0){
//         var v = section % 10;
//         if(v === 0){
//             if(!zero){
//                 zero = true;
//                 chnStr = chnNumChar[v] + chnStr;
//             }
//         }else{
//             zero = false;
//             strIns = chnNumChar[v];
//             strIns += chnUnitChar[unitPos];
//             chnStr = strIns + chnStr;
//         }
//         unitPos++;
//         section = Math.floor(section / 10);
//     }
//     return chnStr;
// }


toChinesNum(num){
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
  let strArr = temp.toString().split("").reverse();
  let newNum = "";
  for (var i = 0; i < strArr.length; i++) {
    newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
  }
   return newNum;
 }
 let overWan = Math.floor(num / 10000);
 let noWan = JSON.stringify(num % 10000);
 if (noWan.toString().length < 4) noWan = "0" + noWan;
 return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}

}
