import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaddressPageRoutingModule } from './editaddress-routing.module';

import { EditaddressPage } from './editaddress.page';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaddressPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
  ],
  declarations: [EditaddressPage],
})
export class EditaddressPageModule {}
