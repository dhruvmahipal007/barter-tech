import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaPage } from './pizza.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaPageRoutingModule {}
