import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Http,Jsonp } from '@angular/http';

/**
 * Generated class for the ProblemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-problems',
  templateUrl: 'problems.html',
})
export class ProblemsPage {
public arr=[
  // {
  //   title:'什么是此产品',
  //   discription:'解释产品的一段文字1',
  //   clicked:false
  // },
  // {
  //   title:'如何借款',
  //   discription:'解释产品的一段文字2',
  //   clicked:false
  // },
  // {
  //   title:'什么是展期',
  //   discription:'解释产品的一段文字3',
  //   clicked:false
  // }
]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemsPage');
    var that=this
    this.http.get('http://yellow.situojinfu.com/index/index/question').subscribe(function(res){
      console.log(JSON.parse(res['_body']))
      that.arr=JSON.parse(res['_body']).data
      
    })
    console.log(that.arr)
  }


  showproblem(i){
    this.arr[i].clicked=!this.arr[i].clicked
  }

  ionViewDidEnter(){
    
  }
}
