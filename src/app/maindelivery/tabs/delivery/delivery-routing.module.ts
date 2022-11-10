import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPage } from './delivery.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPage,
  },
];
// const routes: Routes = [
//   {
//     path: '',
//     component: DeliveryPage,
//     children: [
//       {
//         path: 'account',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../../footer/account/account.module').then(
//                 (m) => m.AccountPageModule
//               ),
//           },
//         ],
//       },
//       {
//         path: 'search',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../../footer/search/search.module').then(
//                 (m) => m.SearchPageModule
//               ),
//           },
//         ],
//       },
//       {
//         path: 'cart',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../../footer/cart/cart.module').then(
//                 (m) => m.CartPageModule
//               ),
//           },
//         ],
//       },
//     ],
//   },
// ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPageRoutingModule {}
