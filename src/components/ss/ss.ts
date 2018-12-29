import { Component } from '@angular/core';
import {QRScanner,QRScannerStatus} from '@ionic-native/qr-scanner'

/**
 * Generated class for the SsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ss',
  templateUrl: 'ss.html'
})
export class SsComponent {

  text: string;

  constructor(public qrscanner:QRScanner) {
    console.log('Hello SsComponent Component');
    this.text = 'Hello World';
  }

}
