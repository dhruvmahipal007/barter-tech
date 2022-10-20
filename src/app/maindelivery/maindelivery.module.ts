import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaindeliveryPageRoutingModule } from './maindelivery-routing.module';

import { MaindeliveryPage } from './maindelivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaindeliveryPageRoutingModule
  ],
  declarations: [MaindeliveryPage]
})
export class MaindeliveryPageModule {}

interface TabsCustomEvent extends CustomEvent {
  detail: { tab: string };
  target: HTMLIonTabsElement;
}




