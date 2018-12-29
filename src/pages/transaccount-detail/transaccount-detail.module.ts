import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaccountDetailPage } from './transaccount-detail';

@NgModule({
  declarations: [
    TransaccountDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaccountDetailPage),
  ],
})
export class TransaccountDetailPageModule {}
