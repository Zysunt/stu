import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Refresher} from 'ionic-angular';
import {JiekuanEdPage} from '../../pages/jiekuan-ed/jiekuan-ed';
import { HexiaoPage} from '../../pages/hexiao/hexiao';
import { ZhanqiPage} from '../../pages/zhanqi/zhanqi';
import { text } from '@angular/core/src/render3/instructions';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/Rx'
/**
 * Generated class for the DaihuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daihuan',
  templateUrl: 'daihuan.html',
})
export class DaihuanPage {
  public headers:any = new Headers({'Content-Type':'application/json'});
  shouorhuan:boolean;
  public ways:any;
  public filter:any;
  public user_id:any;
  public is_over:any=0;

  huanqingMon = 1245;
  wYuQHuan = 45421;
  yuQHuan = 4548578;
  totalMoney = 578784;
  selector: any;
  searchways: any;
  appType = 'Dqian';
  btn=false;
  isYuQi = false;
  switch = 'weiyuQi';
  ishuan = false;
  btns:any = {
    'weiyuQi':[
      '所有未逾期',
      '今天到期',
      '7天内到期'
    ],
    'yuQi':[
      '所有逾期',
      '逾期7天内',
      '逾期7-15天',
      '逾期16-30天',
      '逾期31-60天',
      '逾期60天以上'
    ]


  }
  apps: any = {
    'Dqian': [
      {
        manName :"sheep",
        DQday:21,
        dateTime:"2018-12-14",
        money :4411111,
        Dqian:true,
        yuQi:true,
        isShowque:false,
        isShowz:false,
      },
      {
        manName :"monkey",
        DQday:18,
        dateTime:"2018-12-14",
        money :4411111,
        Dqian:true,
        yuQi:true,
        isShowque:false,
        isShowz:true,
      },
      {
        manName :"lion",
        DQday:15,
        dateTime:"2018-12-14",
        money :4411111,
        Dqian:true,
        yuQi:true,
        isShowque:true,
        isShowz:false,
      },      
    ],
    'Yhuan': [
      { 
        huanName:"lonnn",
        yihuanMon:121524,
        Yhuan:true
      },
      {
        huanName:"lonnn",
        yihuanMon:121524,
        Yhuan:true
      }
    ]  
  };
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     public storage:Storage) {
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.selector = [
    { 'text': '应还日期近到远', 'value': 'tofar' },
    { 'text': '应还日期远到近', 'value': 'toclose' },
];
}
// ionViewDidLoad(){
//   console.log("1.0 ionViewDidLoad 当页面加载的时候触发，仅在页面创建的时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发");
// }
// ionViewWillEnter(){
//   console.log("2.0 ionViewWillEnter 顾名思义，当将要进入页面时触发");
// }
// ionViewDidEnter(){
//   console.log("3.0 ionViewDidEnter 当进入页面时触发");
// }
// ionViewWillLeave(){
//   console.log("4.0 ionViewWillLeave 当将要从页面离开时触发");
// }
// ionViewDidLeave(){
//   console.log("5.0 ionViewDidLeave 离开页面时触发");
// }
// ionViewWillUnload(){
//   console.log("6.0 ionViewWillUnload 当页面将要销毁同时页面上元素移除时触发");
// }

//   ionViewCanEnter(){
//       console.log("ionViewCanEnter");
//   }

//   ionViewCanLeave(){
//       console.log("ionViewCanLeave");
//   }

ionViewWillEnter(){
  // 代还
var that=this
this.storage.get('user').then((val) =>{
  var valj=JSON.parse(val).id
  that.user_id=valj
  var url='http://appv2.situojinfu.com/index/order/daihuan'
  this.http.post(url,{user_id:this.user_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
    console.log(res)
    var dt=res.data
    that.huanqingMon=dt.alreadyMoney
    that.wYuQHuan=dt.notOverMoney
    that.yuQHuan=dt.overMoney
    that.totalMoney=that.wYuQHuan+that.yuQHuan
    that.apps['Dqian']=dt.huanList
    that.apps['Yhuan']=dt.alreadyHuanList

    console.log(that.apps['Dqian'])
    console.log(that.apps['Yhuan'])
  })
})
}


YuqiorHQ(a){
if(a=='dangqian'){
  this.ishuan=false
  console.log(this.ishuan)
}else{
  this.ishuan=true;
  console.log(this.ishuan)
}

}
showBox(a){
  this.btn=true;
  this.getBtns(a) ;
  if(a == 'weiyuQi'){
    this.is_over =0;
  }else{
    this.is_over=1
  }
}
hideBox(){
  this.btn =false;
}

toNext(isShowque,isShowz){
 
this.navCtrl.push(JiekuanEdPage,
  {
    isShowque:isShowque,
    isShowz:isShowz  
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DaihuanPage');

  }
  
  compareFn(option1: any, option2: any) {
    return option1.value === option2.value;
}

  getItems(type: any) {
    return this.apps[type];
  }
  getBtns(type: any) {
    return this.btns[type];
  }
  doRefresh(refresher: Refresher) {
      
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }

ToHexiao(){
  this.navCtrl.push(HexiaoPage);
}
ToZhanqiPage(){
  this.navCtrl.push(ZhanqiPage);
}


// ngAfterContentChecked(): void {
//   //Called after every check of the component's or directive's content.
//   //Add 'implements AfterContentChecked' to the class.
//   if(this.searchways!==undefined){
//     if(this.searchways.value=='tofar'){
//       this.apps['Dqian'].sort(this.sortNumber)
//       console.log(this.apps['Dqian'])
//     }else if(this.searchways.value=='toclose'){
//       this.apps['Dqian'].sort(this.sortnumber)
//       console.log(this.apps['Dqian'])
//     }
//   } 
// }

// sortNumber(a,b){
// return a.DQday - b.DQday
// }

// sortnumber(a,b){
//   return b.DQday - a.DQday
//   }




  // initializeItems() {
  //  this.apps = {
  //     'Dqian': [    
  //     ],
  //     'Yhuan': [
  //     ]  
  //   };
  // }

//   filters(ev) {
//     // Reset items back to all of the items
// this.initializeItems()

//     // set val to the value of the ev target
//     var val = ev.target.value;
// console.log(val)
// this.filter=val
//     // if the value is an empty string don't filter the items
//     if (val && val.trim() != '') {
//       this.apps['Dqian'] = this.apps['Dqian'].filter((item) => {
//         return (item.manName.toLowerCase().indexOf(val.toLowerCase()) > -1);
//       })
//     }
//   }
}
