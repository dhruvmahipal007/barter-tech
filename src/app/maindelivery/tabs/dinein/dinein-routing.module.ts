import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DineinPage } from './dinein.page';

const routes: Routes = [
  {
    path: '',
    component: DineinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DineinPageRoutingModule {}
