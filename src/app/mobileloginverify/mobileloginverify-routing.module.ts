import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileloginverifyPage } from './mobileloginverify.page';

const routes: Routes = [
  {
    path: '',
    component: MobileloginverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileloginverifyPageRoutingModule {}
