import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaladPageRoutingModule } from './salad-routing.module';

import { SaladPage } from './salad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaladPageRoutingModule
  ],
  declarations: [SaladPage]
})
export class SaladPageModule {}
