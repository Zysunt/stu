import { Component } from '@angular/core';
import {  NavController, NavParams ,Refresher, ToastController, LoadingController} from 'ionic-angular';
import { HexiaoPage} from '../../pages/hexiao/hexiao';
import {Http,Jsonp} from '@angular/http';
import {Storage} from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser'
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the DaihuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-daishou',
  templateUrl: 'daishou.html',
})
export class DaishouPage extends BaseUI{
  public headers:any = new Headers({'Content-Type':'application/json'});
  public filter:any;
  public user_id:any;
  public is_over:any=0;
  
  shouorhuan:boolean;

  public curalready=1;
  public curyuqi=1;
  public curnotyuqi=1;

   
  public yuqifull:any;
  public notyuqifull:any;


  huanqingMon:any;
  wYuQHuan:any;
  yuQHuan:any;
  totalMoney:any;
  searchways: any;
public  selector: any;
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

    ],
    'Yhuan': [

    ]  
  };


  apps2: any = {
    'Dqian': [

    ],
    'Yhuan': [

    ]  
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:Http,
    public storage:Storage,
    public sanitizer: DomSanitizer,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController
   ) {
     super()
  }




 ionViewWillEnter(){
   this.selector=[
    { text: '应还日期近到远', value: 1 },
    { text: '应还日期远到近', value: 2 }
   ]
  this.yuqifull=0
  this.notyuqifull=0
this.curalready=1
this.curnotyuqi=1
this.curyuqi=1
  // 代收
  var that=this
  this.storage.get('user').then((val) =>{
    var valj=JSON.parse(val).id
    that.user_id=valj
    var url='http://yellow.situojinfu.com/index/order/daishou'
    this.http.post(url,{user_id:that.user_id},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      var dt=res.data
      that.huanqingMon=dt.alreadyMoney
      that.wYuQHuan=dt.notOverMoney
      that.yuQHuan=dt.overMoney
      that.totalMoney=that.wYuQHuan+that.yuQHuan
      that.apps['Dqian']=dt.lenderList.data
      that.apps['Yhuan']=dt.alreadyShouList.data

      that.apps2['Dqian']=dt.lenderList.data
      that.apps2['Yhuan']=dt.alreadyShouList.data

    })
  })
   
}



YuqiorHQ(a){
if(a=='dangqian'){
  this.ishuan=false

}else{
  this.ishuan=true;

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
}
hideBox(){
  this.btn =false;
}

toNext(order_id,str,is_back){
if(str!=='冻结'){
  this.navCtrl.push(HexiaoPage,{
    order_id:order_id,
    str:str,
    is_back:is_back
  });
}
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
    console.log(this.searchways)
    this.yuqifull=0
    this.notyuqifull=0
    this.curalready=1
    this.curnotyuqi=1
    this.curyuqi=1
    this.searchways=null
    var that=this
      var url='http://yellow.situojinfu.com/index/order/daishou'
      this.http.post(url,{user_id:this.user_id,order:this.searchways},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        var dt=res.data
        that.huanqingMon=dt.alreadyMoney
        that.wYuQHuan=dt.notOverMoney
        that.yuQHuan=dt.overMoney
        that.totalMoney=that.wYuQHuan+that.yuQHuan
        that.apps['Dqian']=dt.lenderList.data
        that.apps['Yhuan']=dt.alreadyShouList.data
        refresher.complete();
      })

      // setTimeout(() => {
      //   refresher.complete();
      // }, 1000);
    }


    search(val){
      console.log(val.value)
          var that=this
            var url='http://yellow.situojinfu.com/index/order/daishou'
            this.http.post(url,{user_id:this.user_id,order:val.value,page:1,page_size:8},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
              that.yuqifull=0
              that.notyuqifull=0
              that.curalready=1
              that.curnotyuqi=1
              that.curyuqi=1
              that.searchways=val.value
              var dt=res.data
              that.huanqingMon=dt.alreadyMoney
              that.wYuQHuan=dt.notOverMoney
              that.yuQHuan=dt.overMoney
              that.totalMoney=that.wYuQHuan+that.yuQHuan
              that.apps['Dqian']=dt.lenderList.data
              that.apps['Yhuan']=dt.alreadyShouList.data
              
            })       
      }



sortNumber(a,b){
return a.back_time > b.back_time ? 1 : -1
}

sortnumber(a,b){
  return a.back_time < b.back_time ? 1 : -1
  }




  initializeItems() {
    this.apps['Dqian']=this.apps2['Dqian']
   
  }

  filters(ev) {
    // Reset items back to all of the items
this.initializeItems()
// this.getItems

    // set val to the value of the ev target
    var val = ev.target.value;
this.filter=val
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.apps['Dqian'] = this.apps['Dqian'].filter((item) => {
        return (item.borrow_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }



   // 分页
   doInfinite(infiniteScroll) {

    if(this.searchways==undefined){
      this.searchways=null
    }
    var that=this
    var url='http://yellow.situojinfu.com/index/order/daishou'
    if(this.appType=='Yhuan'){ //Dqian   Yhuan
      this.curalready++
      this.http.post(url,{user_id:this.user_id,page:this.curalready,page_size:8,order:this.searchways},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        var dt=res.data
        that.huanqingMon=dt.alreadyMoney
        that.wYuQHuan=dt.notOverMoney
        that.yuQHuan=dt.overMoney
        that.totalMoney=that.wYuQHuan+that.yuQHuan
        for(var i=0;i<=dt.alreadyShouList.data.length;i++){
          that.apps['Yhuan'].push(dt.alreadyShouList.data)
        }
        infiniteScroll.complete();
  
        if (that.apps['Yhuan'].length>=res.data.alreadyShouList.total) {
        infiniteScroll.enable(false);
      }
      setTimeout(infiniteScroll.enable(true),1000)
      })
    }else if(this.switch=='weiyuQi'&&this.appType=='Dqian'){  //weiyuQi   yuQi
      this.curnotyuqi++
      this.http.post(url,{user_id:this.user_id,page:this.curnotyuqi,page_size:8,order:this.searchways},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        var dt=res.data
        that.huanqingMon=dt.alreadyMoney
        that.wYuQHuan=dt.notOverMoney
        that.yuQHuan=dt.overMoney
        that.totalMoney=that.wYuQHuan+that.yuQHuan
        var beforel=that.apps['Dqian'].length

        for(var i=0;i<dt.lenderList.data.length;i++){
          if(dt.lenderList.data[i].is_over==0){
            that.apps['Dqian'].push(dt.lenderList.data[i])
          }
        }
        infiniteScroll.complete();
        var afterl=that.apps['Dqian'].length
        if(beforel==afterl){
          // that.notyuqifull=1
            infiniteScroll.enable(false)
          that.fnnotice()
        }
        
        setTimeout(infiniteScroll.enable(true),1000)
      })
    }else if(this.switch=='yuQi'&&this.appType=='Dqian'){
      this.curyuqi++
      this.http.post(url,{user_id:this.user_id,page:this.curyuqi,page_size:8,order:this.searchways},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
        var dt=res.data
        that.huanqingMon=dt.alreadyMoney
        that.wYuQHuan=dt.notOverMoney
        that.yuQHuan=dt.overMoney
        that.totalMoney=that.wYuQHuan+that.yuQHuan
        var beforel=that.apps['Dqian'].length
        for(var i=0;i<dt.lenderList.data.length;i++){
          if(dt.lenderList.data[i].is_over==1){
            that.apps['Dqian'].push(dt.lenderList.data[i])
          }
        }
        infiniteScroll.complete();
        var afterl=that.apps['Dqian'].length
        if(beforel==afterl){
          // that.yuqifull=1
          infiniteScroll.enable(false)
          that.fnnotice()
        }
        
        setTimeout(infiniteScroll.enable(true),1000)
      })
    }
  }

  fnnotice(){
    super.showToast(this.toastCtrl,'没有更多数据了')
  }


}
