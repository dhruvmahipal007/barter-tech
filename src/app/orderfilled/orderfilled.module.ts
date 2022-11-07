import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderfilledPageRoutingModule } from './orderfilled-routing.module';

import { OrderfilledPage } from './orderfilled.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderfilledPageRoutingModule
  ],
  declarations: [OrderfilledPage]
})
export class OrderfilledPageModule {}
