import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionPageRoutingModule } from './payment-option-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentOptionPageRoutingModule
  ],
  declarations: []
})
export class PaymentOptionPageModule {}
