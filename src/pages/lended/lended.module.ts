import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LendedPage } from './lended';

@NgModule({
  declarations: [
    LendedPage,
  ],
  imports: [
    IonicPageModule.forChild(LendedPage),
  ],
})
export class LendedPageModule {}
