import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeawayPageRoutingModule } from './takeaway-routing.module';

import { TakeawayPage } from './takeaway.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeawayPageRoutingModule
  ],
  declarations: [TakeawayPage]
})
export class TakeawayPageModule {}
