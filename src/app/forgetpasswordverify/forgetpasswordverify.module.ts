import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpasswordverifyPageRoutingModule } from './forgetpasswordverify-routing.module';

import { ForgetpasswordverifyPage } from './forgetpasswordverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpasswordverifyPageRoutingModule
  ],
  declarations: [ForgetpasswordverifyPage]
})
export class ForgetpasswordverifyPageModule {}
