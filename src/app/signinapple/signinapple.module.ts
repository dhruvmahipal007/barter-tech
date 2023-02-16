import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninapplePageRoutingModule } from './signinapple-routing.module';

import { SigninapplePage } from './signinapple.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninapplePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SigninapplePage]
})
export class SigninapplePageModule {}
