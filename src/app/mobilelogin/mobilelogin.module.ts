import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileloginPageRoutingModule } from './mobilelogin-routing.module';

import { MobileloginPage } from './mobilelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileloginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MobileloginPage],
})
export class MobileloginPageModule {}
