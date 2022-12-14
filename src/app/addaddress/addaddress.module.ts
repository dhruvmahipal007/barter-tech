import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddaddressPageRoutingModule } from './addaddress-routing.module';

import { AddaddressPage } from './addaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddaddressPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddaddressPage],
})
export class AddaddressPageModule {}
