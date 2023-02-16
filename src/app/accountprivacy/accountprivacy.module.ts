import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountprivacyPageRoutingModule } from './accountprivacy-routing.module';

import { AccountprivacyPage } from './accountprivacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountprivacyPageRoutingModule
  ],
  declarations: [AccountprivacyPage]
})
export class AccountprivacyPageModule {}
