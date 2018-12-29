import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanNextPage } from './scan-next';

@NgModule({
  declarations: [
    ScanNextPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanNextPage),
  ],
})
export class ScanNextPageModule {}
