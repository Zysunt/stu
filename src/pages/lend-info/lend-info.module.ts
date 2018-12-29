import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LendInfoPage } from './lend-info';

@NgModule({
  declarations: [
    LendInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(LendInfoPage),
  ],
})
export class LendInfoPageModule {}
