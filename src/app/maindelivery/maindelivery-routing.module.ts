import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaindeliveryPage } from './maindelivery.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: MaindeliveryPage,
//     // children: [{
//     //   path: 'salad',
//     //   loadChildren: () => import('./category/salad/salad.module').then( m => m.SaladPageModule)
//     // },
//     // {
//     //   path: 'side',
//     //   loadChildren: () => import('./category/side/side.module').then( m => m.SidePageModule)
//     // },
//     // {
//     //   path: 'pizza',
//     //   loadChildren: () => import('./category/pizza/pizza.module').then( m => m.PizzaPageModule)
//     // },
//     // {
//     //   path: 'burger',
//     //   loadChildren: () => import('./category/burger/burger.module').then( m => m.BurgerPageModule)
//     // },
//     // {
//     //   path: 'dimatina',
//     //   loadChildren: () => import('./category/dimatina/dimatina.module').then( m => m.DimatinaPageModule)
//     // },
//     // {
//     //   path: 'dessert',
//     //   loadChildren: () => import('./category/dessert/dessert.module').then( m => m.DessertPageModule)
//     // }]
//   },

//   {
//     path: 'takeaway',
//     loadChildren: () =>
//       import('../maindelivery/tabs/takeaway/takeaway.module').then(
//         (m) => m.TakeawayPageModule
//       ),
//   },
//   // {
//   //   path: 'reservation',
//   //   loadChildren: () => import('../maindelivery/tabs/reservation/reservation.module').then( m => m.ReservationPageModule)
//   // },
//   {
//     path: 'delivery',
//     loadChildren: () =>
//       import('../maindelivery/tabs/delivery/delivery.module').then(
//         (m) => m.DeliveryPageModule
//       ),
//   },
//   {
//     path: 'dinein',
//     loadChildren: () =>
//       import('../maindelivery/tabs/dinein/dinein.module').then(
//         (m) => m.DineinPageModule
//       ),
//   },

//   {
//     path: 'search',
//     loadChildren: () =>
//       import('./footer/search/search.module').then((m) => m.SearchPageModule),
//   },
//   {
//     path: 'cart',
//     loadChildren: () =>
//       import('./footer/cart/cart.module').then((m) => m.CartPageModule),
//   },
//   {
//     path: 'account',
//     loadChildren: () =>
//       import('./footer/account/account.module').then(
//         (m) => m.AccountPageModule
//       ),
//   },
//   {
//     path: 'reservation',
//     loadChildren: () =>
//       import('./tabs/reservation/reservation.module').then(
//         (m) => m.ReservationPageModule
//       ),
//   },
// ];

const routes: Routes = [
  {
    path: 'maindelivery',
    component: MaindeliveryPage,
    children: [
      {
        path: 'takeaway',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tabs/delivery/delivery.module').then(
                (m) => m.DeliveryPageModule
              ),
          },
        ],
      },
      {
        path: 'reservation',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tabs/reservation/reservation.module').then(
                (m) => m.ReservationPageModule
              ),
          },
        ],
      },
      {
        path: 'dinein',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tabs/delivery/delivery.module').then(
                (m) => m.DeliveryPageModule
              ),
          },
        ],
      },
      {
        path: 'delivery',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tabs/delivery/delivery.module').then(
                (m) => m.DeliveryPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/maindelivery/delivery',
        pathMatch: 'full',
      },
    ],
  },
  // {
  //   path: 'account',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./footer/account/account.module').then(
  //           (m) => m.AccountPageModule
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: 'search',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./footer/search/search.module').then(
  //           (m) => m.SearchPageModule
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: 'cart',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./footer/cart/cart.module').then((m) => m.CartPageModule),
  //     },
  //   ],
  // },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaindeliveryPageRoutingModule {}
