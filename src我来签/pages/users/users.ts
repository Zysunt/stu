import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {Http,Jsonp} from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/Rx';
import { BaseUI } from '../../baseUI/baseUI';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage extends BaseUI{
  public searching:any;
  public headers:any = new Headers({'Content-Type':'application/json'});
  public user_id:any;
public items = [
  {
    name:'王卡',
    tel:'182****0105'
  },
  {
    name:'墨白',
    tel:'155****3452'
  }
];

public searchid:any;
public searchname:any;
public searchmobile:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public http:Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController) {
      // this.initializeItems();
      super()
  }
  
  ionViewDidLoad() {
    var that=this
    console.log('ionViewDidLoad UsersPage');
    this.storage.get('user').then((val) =>{
      var valj=JSON.parse(val).id
    that.user_id=valj
    var url='http://yellow.situojinfu.com/index/tool/getBorrowList'
    this.http.post(url,{user_id:1932},{headers:that.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      that.items=res.data
    })
    })
  }




  // initializeItems() {
  //   this.items = [
  //     {
  //       headface:'assets/imgs/zhuanzhang/pic.png',
  //       name:'王卡',
  //       tel:'182****0105'
  //     },
  //     {
  //       headface:'assets/imgs/zhuanzhang/pic.png',
  //       name:'墨白',
  //       tel:'155****3452'
  //     }
  //   ];
  // }

//   getItems(ev) {
//     // Reset items back to all of the items
//     this.initializeItems();

//     // set val to the value of the ev target
//     var val = ev.target.value;
// console.log(val)
//     // if the value is an empty string don't filter the items
//     if (val && val.trim() != '') {
//       this.items = this.items.filter((item) => {
//         return (item.tel.toLowerCase().indexOf(val.toLowerCase()) > -1);
//       })
//     }
//   }

ngAfterContentChecked(): void {
  //Called after every check of the component's or directive's content.
  //Add 'implements AfterContentChecked' to the class.
  // console.log(this.searchlist.length)
}


showusers(){
  if(this.searching==undefined){
    super.showToast(this.toastCtrl,'请填写搜索的用户手机号')
  }else if(/^1[3456789]\d{9}$/.test(this.searching)==false){
    super.showToast(this.toastCtrl,'手机号格式不正确')
  }else{
    var that = this
    var url='http://yellow.situojinfu.com/index/tool/getBorrowByMobile'
    this.http.post(url,{mobile:this.searching},{headers:this.headers}).map(res =>res.json()).subscribe(function(res){
      console.log(res)
      that.fns(res.code,res.message,res.data)
    })
  }
}


fns(code,msg,data){
  var loading=super.showLoading(this.loadingCtrl,'搜索中...')
  if(code==200){
    super.showToast(this.toastCtrl,msg)
    if(data.name==null){
      data.name=='未实名'
    }
    this.items.splice(0,0,data)
    loading.dismiss()
  }else{
    super.showToast(this.toastCtrl,msg)
    loading.dismiss()
  }
}


}
