import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileloginverifyPageRoutingModule } from './mobileloginverify-routing.module';

import { MobileloginverifyPage } from './mobileloginverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileloginverifyPageRoutingModule
  ],
  declarations: [MobileloginverifyPage]
})
export class MobileloginverifyPageModule {}
