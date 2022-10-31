import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalconditionPageRoutingModule } from './legalcondition-routing.module';

import { LegalconditionPage } from './legalcondition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalconditionPageRoutingModule
  ],
  declarations: [LegalconditionPage]
})
export class LegalconditionPageModule {}
