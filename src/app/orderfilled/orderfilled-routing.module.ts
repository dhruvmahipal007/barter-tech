import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderfilledPage } from './orderfilled.page';

const routes: Routes = [
  {
    path: '',
    component: OrderfilledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderfilledPageRoutingModule {}
