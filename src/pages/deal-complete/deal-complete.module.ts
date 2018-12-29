import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealCompletePage } from './deal-complete';

@NgModule({
  declarations: [
    DealCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(DealCompletePage),
  ],
})
export class DealCompletePageModule {}
