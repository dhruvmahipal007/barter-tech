import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaladPage } from './salad.page';

const routes: Routes = [
  {
    path: '',
    component: SaladPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaladPageRoutingModule {}
