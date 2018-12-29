import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrdcanPage } from './qrdcan';

@NgModule({
  declarations: [
    QrdcanPage,
  ],
  imports: [
    IonicPageModule.forChild(QrdcanPage),
  ],
})
export class QrdcanPageModule {}
