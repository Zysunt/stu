import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaccountPage } from './transaccount';

@NgModule({
  declarations: [
    TransaccountPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaccountPage),
  ],
})
export class TransaccountPageModule {}
