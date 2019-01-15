import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Subscription } from 'rxjs/Subscription';
// import cordova from 'cordova'
import { timer } from 'rxjs/Observable/timer';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private logs = new Array<string>();

  private  subscription:Subscription;

  constructor(public navCtrl: NavController,
              private ngZone: NgZone,
              private broadcaster: Broadcaster) {

  }




  private L( ...args: any[] ) {
    let v = args.join(' ');
    console.log(v);
    this.ngZone.run( () => this.logs.push(v) );
  }

  onRegisterListener() {
    if( this.subscription &&  !this.subscription.closed ) return;
    const ev = "TEST.EVENT"
    this.L( "register event", ev);
    this.subscription = this.broadcaster.addEventListener(ev)
        .subscribe( event =>
          {
            this.L( "received", ev, "\n", JSON.stringify(event))
            alert(event)
            this.navCtrl.setRoot(LoginPage)
          });

  }

  onUnregisterListener() {
    if( !this.subscription || this.subscription.closed ) return;
    this.L( "unregister event", "TEST.EVENT");
    this.subscription.unsubscribe();
  }

  onStartTest() {

    this.L( "PLATFORM", cordova.platformId );

    if( cordova.platformId === "browser" ) {
        const ev = "TEST.EVENT";
        timer(1000,1000)
          .subscribe( (v)=> {
            this.L( "fire native event", ev);
            let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
            document.dispatchEvent( event );
          })

    }
    else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
      const ev = "START.TEST.EVENT";
      this.L( "fire native event", ev);
      this.broadcaster.fireNativeEvent( ev, { start:1000, period:1000} );

    }

  }

  change(){
    var that=this
    this.broadcaster.addEventListener('TEST.EVENT').subscribe((event) =>{
      console.log(event)
      alert(event)
      that.navCtrl.setRoot(LoginPage)
    })
  }

  onClearLog() {
    this.ngZone.run( () => this.logs = [] );
  }
}
