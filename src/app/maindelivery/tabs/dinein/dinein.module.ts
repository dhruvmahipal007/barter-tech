import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DineinPageRoutingModule } from './dinein-routing.module';

import { DineinPage } from './dinein.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DineinPageRoutingModule
  ],
  declarations: [DineinPage]
})
export class DineinPageModule {}
