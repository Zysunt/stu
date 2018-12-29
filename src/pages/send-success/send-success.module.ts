import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendSuccessPage } from './send-success';

@NgModule({
  declarations: [
    SendSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(SendSuccessPage),
  ],
})
export class SendSuccessPageModule {}
