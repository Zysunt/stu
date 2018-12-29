import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebitPage } from './debit';

@NgModule({
  declarations: [
    DebitPage,
  ],
  imports: [
    IonicPageModule.forChild(DebitPage),
  ],
})
export class DebitPageModule {}
