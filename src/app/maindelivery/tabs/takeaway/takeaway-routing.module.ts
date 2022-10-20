import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeawayPage } from './takeaway.page';

const routes: Routes = [
  {
    path: '',
    component: TakeawayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeawayPageRoutingModule {}
