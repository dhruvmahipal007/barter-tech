import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaindeliveryPage } from './maindelivery.page';

const routes: Routes = [
  {
    path: '',
    component: MaindeliveryPage,
    // children: [{
    //   path: 'salad',
    //   loadChildren: () => import('./category/salad/salad.module').then( m => m.SaladPageModule)
    // },
    // {
    //   path: 'side',
    //   loadChildren: () => import('./category/side/side.module').then( m => m.SidePageModule)
    // },
    // {
    //   path: 'pizza',
    //   loadChildren: () => import('./category/pizza/pizza.module').then( m => m.PizzaPageModule)
    // },
    // {
    //   path: 'burger',
    //   loadChildren: () => import('./category/burger/burger.module').then( m => m.BurgerPageModule)
    // },
    // {
    //   path: 'dimatina',
    //   loadChildren: () => import('./category/dimatina/dimatina.module').then( m => m.DimatinaPageModule)
    // },
    // {
    //   path: 'dessert',
    //   loadChildren: () => import('./category/dessert/dessert.module').then( m => m.DessertPageModule)
    // }]
},
  {
    path: 'search',
    loadChildren: () => import('./footer/search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaindeliveryPageRoutingModule {}
