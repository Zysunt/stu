import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigningPage } from './signing';

@NgModule({
  declarations: [
    SigningPage,
  ],
  imports: [
    IonicPageModule.forChild(SigningPage),
  ],
})
export class SigningPageModule {}
