import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Refresher} from 'ionic-angular';
import { HexiaoPage} from '../../pages/hexiao/hexiao';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the DaihuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daishou',
  templateUrl: 'daishou.html',
})
export class DaishouPage {
  public headers:any = new Headers({'Content-Type':'application/json'});
  public filter:any;
  public user_id:any;
  public is_over:any=0;
  shouorhuan:boolean;

  huanqingMon = 1245;
  wYuQHuan = 45421;
  yuQHuan = 4548578;
  totalMoney = 578784;
  searchways: any;
  selector: any;
  appType = 'Dqian';
  btn=false;
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
        manName :"landy",
        DQday:21,
        dateTime:"2018-12-14",
        money :4411111,
        Dqian:true,
        yishou:false,
        isShowz:false
      },
      {
        manName :"blsds",
        DQday:222,
        dateTime:"2018-12-14",
        money :4411111,
        Dqian:true,
        yishou:false,
        isShowz:true,
       
      },
    ],
    'Yhuan': [
      { 
        huanName:"lonnn",
        yihuanMon:121524,
        Yhuan:true,
        Dqian:false,
        yishou:true
      },
      {
        huanName:"lonnn",
        yihuanMon:121524,
        Yhuan:true,
        Dqian:false,
        yishou:true
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
    { text: '应还日期近到远', value: 'tofar' },
    { text: '应还日期远到近', value: 'toclose' },
   
];

}

ionViewWillEnter(){
  // 代收
  var that=this
  this.storage.get('user').then((val) =>{
    var valj=JSON.parse(val).id
    that.user_id=valj
    var url='http://appv2.situojinfu.com/index/order/daishou'
    this.http.post(url,{user_id:2941},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      var dt=res.data
      that.huanqingMon=dt.alreadyMoney
      that.wYuQHuan=dt.notOverMoney
      that.yuQHuan=dt.overMoney
      that.totalMoney=that.wYuQHuan+that.yuQHuan
      that.apps['Dqian']=dt.lenderList
      that.apps['Yhuan']=dt.alreadyShouList

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
  this.getBtns(a) 
 if(a=='weiyuQi'){
   this.is_over=0
 }else{
   this.is_over=1
 }
 console.log(this.is_over)
}
hideBox(){
  this.btn =false;
}

toNext(order_id,str,is_back){
this.navCtrl.push(HexiaoPage,{
  order_id:order_id,
  str:str,
  is_back:is_back
});
}
  ionViewDidLoad() {
  

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

}
