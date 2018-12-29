import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DaishouPage} from '../../pages/daishou/daishou'
/**
 * Generated class for the ZhanqiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zhanqi',
  templateUrl: 'zhanqi.html',
})
export class ZhanqiPage {
 public  time:any;
 public curtime:any;
public duringdays:any;
brate = 24;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZhanqiPage');
    this.time = new Date(new Date().getTime()+8*60*60*1000).toISOString().slice(0,10);
    this.curtime = this.time
    // console.log(this.curtime.slice(0,10))
   
  }
  calculateTime(offset: any) {

    let d = new Date();

    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }
  stdTimezoneOffset(today: any) {
    let jan = new Date(today.getFullYear(), 0, 1);
    let jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  dst(today: any) {
    return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
  }


  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.time!==undefined){
      // this.time=JSON.stringify(this.time)
   var  para=new Date(this.time.replace(/-/g,'/'))
   var curtime=new Date()
   var during=para.getTime()-curtime.getTime()
    this.duringdays=Math.ceil(during / (1000 * 60 * 60 * 24))
    }
    
  }

  ToDaishou(){
    this.navCtrl.popToRoot();
  }
}
