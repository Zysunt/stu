import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCreditPage } from './add-credit';

@NgModule({
  declarations: [
    AddCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCreditPage),
  ],
})
export class AddCreditPageModule {}
