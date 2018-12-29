import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaishouPage } from './daishou';

@NgModule({
  declarations: [
    DaishouPage,
  ],
  imports: [
    IonicPageModule.forChild(DaishouPage),
  ],
})
export class DaishouPageModule {}
