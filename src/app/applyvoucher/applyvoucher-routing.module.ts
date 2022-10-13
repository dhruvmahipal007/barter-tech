import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyvoucherPage } from './applyvoucher.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyvoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyvoucherPageRoutingModule {}
