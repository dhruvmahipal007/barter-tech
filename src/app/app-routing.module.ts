import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ConfigGuard } from './config.guard';

const routes: Routes = [
  // {
  //   path: 'cart',
  //   loadChildren: () =>
  //     import('./maindelivery/footer/cart/cart.module').then(
  //       (m) => m.CartPageModule
  //     ),
  // },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'forgetpassword',
    loadChildren: () =>
      import('./forgetpassword/forgetpassword.module').then(
        (m) => m.ForgetpasswordPageModule
      ),
  },
  {
    path: 'mobilelogin',
    loadChildren: () =>
      import('./mobilelogin/mobilelogin.module').then(
        (m) => m.MobileloginPageModule
      ),
  },
  {
    path: 'mobileloginverify',
    loadChildren: () =>
      import('./mobileloginverify/mobileloginverify.module').then(
        (m) => m.MobileloginverifyPageModule
      ),
  },
  {
    path: 'contactus',
    loadChildren: () =>
      import('./contactus/contactus.module').then((m) => m.ContactusPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'addaddress',
    loadChildren: () =>
      import('./addaddress/addaddress.module').then(
        (m) => m.AddaddressPageModule
      ),
    canActivate: [ConfigGuard],
  },
  // {
  //   path: 'delivery',
  //   loadChildren: () =>
  //     import('./maindelivery/tabs/delivery/delivery.module').then(
  //       (m) => m.DeliveryPageModule
  //     ),
  // },
  // {
  //   path: 'takeaway',
  //   loadChildren: () =>
  //     import('./maindelivery/tabs/takeaway/takeaway.module').then(
  //       (m) => m.TakeawayPageModule
  //     ),
  // },
  // {
  //   path: 'dinein',
  //   loadChildren: () =>
  //     import('./maindelivery/tabs/dinein/dinein.module').then(
  //       (m) => m.DineinPageModule
  //     ),
  // },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'manageaddress',
    loadChildren: () =>
      import('./manageaddress/manageaddress.module').then(
        (m) => m.ManageaddressPageModule
      ),
    canActivate: [ConfigGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
    canActivate: [ConfigGuard],
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'applyvoucher',
    loadChildren: () =>
      import('./applyvoucher/applyvoucher.module').then(
        (m) => m.ApplyvoucherPageModule
      ),
    canActivate: [ConfigGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./maindelivery/maindelivery.module').then(
        (m) => m.MaindeliveryPageModule
      ),
    canActivate: [ConfigGuard],
  },
  // {
  //   path: 'salad',
  //   loadChildren: () =>
  //     import('./maindelivery/category/salad/salad.module').then(
  //       (m) => m.SaladPageModule
  //     ),
  // },
  // {
  //   path: 'category/side',
  //   loadChildren: () =>
  //     import('./maindelivery/category/side/side.module').then(
  //       (m) => m.SidePageModule
  //     ),
  // },
  // {
  //   path: 'category/pizza',
  //   loadChildren: () =>
  //     import('./maindelivery/category/pizza/pizza.module').then(
  //       (m) => m.PizzaPageModule
  //     ),
  // },
  // {
  //   path: 'category/burger',
  //   loadChildren: () =>
  //     import('./maindelivery/category/burger/burger.module').then(
  //       (m) => m.BurgerPageModule
  //     ),
  // },
  // {
  //   path: 'category/dimatina',
  //   loadChildren: () =>
  //     import('./maindelivery/category/dimatina/dimatina.module').then(
  //       (m) => m.DimatinaPageModule
  //     ),
  // },
  // {
  //   path: 'category/dessert',
  //   loadChildren: () =>
  //     import('./maindelivery/category/dessert/dessert.module').then(
  //       (m) => m.DessertPageModule
  //     ),
  // },
  // {
  //   path: 'orders',
  //   loadChildren: () =>
  //     import('./orders/orders.module').then((m) => m.OrdersPageModule),
  // },
  // {
  //   path: 'applyvoucher',
  //   loadChildren: () =>
  //     import('./applyvoucher/applyvoucher.module').then(
  //       (m) => m.ApplyvoucherPageModule
  //     ),
  // },
  // {
  //   path: 'reservation',
  //   loadChildren: () =>
  //     import('./maindelivery/tabs/reservation/reservation.module').then(
  //       (m) => m.ReservationPageModule
  //     ),
  // },

  // {
  //   path: 'account',
  //   loadChildren: () =>
  //     import('./maindelivery/footer/account/account.module').then((m) => m.AccountPageModule),
  // },

  // {
  //   path: 'cart',
  //   loadChildren: () =>
  //     import('./maindelivery/footer/cart/cart.module').then(
  //       (m) => m.CartPageModule
  //     ),
  // },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./aboutus/aboutus.module').then((m) => m.AboutusPageModule),
    canActivate: [ConfigGuard],
  },
  {
    path: 'forgetpasswordverify',
    loadChildren: () =>
      import('./forgetpasswordverify/forgetpasswordverify.module').then(
        (m) => m.ForgetpasswordverifyPageModule
      ),
  },
  {
    path: 'changepassword',
    loadChildren: () =>
      import('./changepassword/changepassword.module').then(
        (m) => m.ChangepasswordPageModule
      ),
  },
  {
    path: 'whatson',
    loadChildren: () =>
      import('./whatson/whatson.module').then((m) => m.WhatsonPageModule),
  },
  {
    path: 'legalcondition',
    loadChildren: () =>
      import('./legalcondition/legalcondition.module').then(
        (m) => m.LegalconditionPageModule
      ),
  },
  {
    path: 'orderfilled/:id/:orderNo',
    loadChildren: () =>
      import('./orderfilled/orderfilled.module').then(
        (m) => m.OrderfilledPageModule
      ),
    canActivate: [ConfigGuard],
  },
  {
    path: 'rate',
    loadChildren: () =>
      import('./rate/rate.module').then((m) => m.RatePageModule),
  },
  {
    path: 'editaddress',
    loadChildren: () =>
      import('./editaddress/editaddress.module').then(
        (m) => m.EditaddressPageModule
      ),
    canActivate: [ConfigGuard],
  },

  // {
  //   path: 'search',
  //   loadChildren: () => import('./maindelivery/footer/search/search.module').then(m => m.SearchPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
