import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DimatinaPage } from './dimatina.page';

const routes: Routes = [
  {
    path: '',
    component: DimatinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DimatinaPageRoutingModule {}
