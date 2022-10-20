import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DimatinaPageRoutingModule } from './dimatina-routing.module';

import { DimatinaPage } from './dimatina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DimatinaPageRoutingModule
  ],
  declarations: [DimatinaPage]
})
export class DimatinaPageModule {}
