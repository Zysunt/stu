import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  @ViewChild(Content) content:Content
public borrower_name='王卡';
public borrower_tel='13452147896';
public money='1';
public backdate='2018-11-11';
public final_money='1';
public rate='24';

public showmima=false

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  shouqu(){
    this.showmima=true
  }

  confirm(){
    this.showmima=false;
  }
  scrollTokeyboardHeight(e) {//让content向上滚动 软键盘的高度
    　this.content.scrollTo(0,e.keyboardHeight);
   }
}
