import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCouponPage } from './my-coupon';
import { MultiPickerModule } from "ion-multi-picker";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    // MyCouponPage,
  ],
  imports: [
    MultiPickerModule,
    HttpModule,
    // IonicPageModule.forChild(MyCouponPage),
  ],
})
export class MyCouponPageModule {}
