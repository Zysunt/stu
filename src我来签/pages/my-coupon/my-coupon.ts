import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { ScanNextPage } from "../../pages/scan-next/scan-next";
import { BaseUI } from '../../baseUI/baseUI';
import { Http, Jsonp } from '@angular/http';
import { CityDataProvider } from "../../providers/city-data/city-data";
/**
 * Generated class for the MyCouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-coupon',
  templateUrl: 'my-coupon.html',
})
export class MyCouponPage extends BaseUI {
  cityColumns: any[];
  xueliData: any;
  public headers:any = new Headers({'Content-Type':'application/json'});
  juzhuData: any;
  marryData: any;
  incomeData: any;
  jobData: any;
  PayDayData: any;
  relativesData: any;
  telData: any;
  jichuxinxi: false;
  workxinxi: false;
  lianxiren: false;
  basis: any;
  works: any;
  Contact: any
  xinxi = 'jichuxinxi';
  msg: any = {
    'jichuxinxi': [
      'Basics',


    ],
    'workxinxi': [
      'works',

    ],
    'lianxiren': [
      'Contact'
    ]
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private taostCtrl:ToastController,
    public http:Http,
    public jsonp:Jsonp,
    public cityDataProvider: CityDataProvider) {
      
      super();
      this.cityColumns = this.cityDataProvider.cities;
    this.xueliData = [
      { text: '高中以下', value: '高中以下' },
      { text: '高中', value: '高中' },
      { text: '中专', value: '中专' },
      { text: '大专', value: '大专' },
      { text: '本科', value: '本科' },
      { text: '硕士', value: '硕士' },
      { text: '博士', value: '博士' }
    ];
    this.juzhuData = [
      { text: '六个月以下', value: '六个月以下' },
      { text: '6-12个月', value: '6-12个月' },
      { text: '1-3年', value: '1-3年' },
      { text: '3年以上', value: '3年以上' },

    ];
    this.marryData = [
      { text: '未婚', value: '未婚' },
      { text: '已婚已育', value: '已婚已育' },
      { text: '已婚未育', value: '已婚未育' },
      { text: '其他', value: '其他' },

    ];
    this.incomeData = [
      { text: '2000元以下', value: '2000元以下' },
      { text: '2000-4000元', value: '2000-4000元' },
      { text: '4000-6000元', value: '4000-6000元' },
      { text: '6000元以上', value: '6000元以上' },
    ];
    this.PayDayData = [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
      { text: '6', value: '6' },
      { text: '7', value: '7' },
      { text: '8', value: '8' },
      { text: '9', value: '9' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' },
      { text: '13', value: '13' },
      { text: '14', value: '14' },
      { text: '15', value: '15' },
      { text: '16', value: '16' },
      { text: '17', value: '17' },
      { text: '18', value: '18' },
      { text: '19', value: '19' },
      { text: '20', value: '20' },
      { text: '21', value: '21' },
      { text: '22', value: '22' },
      { text: '23', value: '23' },
      { text: '24', value: '24' },
      { text: '25', value: '25' },
      { text: '26', value: '26' },
      { text: '27', value: '27' },
      { text: '28', value: '28' },
      { text: '29', value: '29' },
      { text: '30', value: '30' },
      { text: '31', value: '31' },

    ];
    this.jobData = [
      { text: '上班族', value: '上班族' },
      { text: '企业主', value: '企业主' },
      { text: '个体户', value: '个体户' },
      { text: '自由职业者', value: '自由职业者' },

    ];
    this.relativesData = [
      { text: '父母', value: '父母' },
      { text: '兄弟姐妹', value: '兄弟姐妹' },
      { text: '配偶', value: '配偶' }
    ];
    this.telData = [
      { text: '18255426632', value: '18255426632' }
    ]

  }

  ionViewDidLoad() {
    console.log('个人信息Page');
  }
  // @ViewChild('areasSelect') areasSelect;
  // showAreasSelect() {
  //   this.areasSelect.open();
  //   }
  // done(data) {
  // this.showAlert(JSON.stringify(data));
  // }
  Basics() {
    this.basis = false;
    this.works = false;
    this.Contact = false
  }
  workmsg() {
    this.works = true;
    this.Contact = false;
    this.basis = true;
  }
  Contacts() {
    this.Contact = true;
    this.basis = true;
    this.works = false;
  }
  compareFn(option1: any, option2: any) {
    return option1.value === option2.value;
  }
  getItems(type: any) {
    return this.msg[type];
  }
  ToNext1(){
    this.xinxi='workxinxi';
  }
  ToNext2(){
    this.xinxi='lianxiren';
  }
  Toscan() {
    var list = document.getElementsByTagName("input");
    for (var i = 0; i < list.length; i++) {
      if (list[i].type == "text") {
        if (list[i].value == "") {
          super.showToast(this.taostCtrl,'请填写完整')
          return false;
        }
      }
    }

    this.navCtrl.push(ScanNextPage);
  

  }






}
