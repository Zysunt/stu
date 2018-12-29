import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenderPage } from './lender';

@NgModule({
  declarations: [
    LenderPage,
  ],
  imports: [
    IonicPageModule.forChild(LenderPage),
  ],
})
export class LenderPageModule {}
