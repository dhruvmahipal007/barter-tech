import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninapplePage } from './signinapple.page';

const routes: Routes = [
  {
    path: '',
    component: SigninapplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninapplePageRoutingModule {}
