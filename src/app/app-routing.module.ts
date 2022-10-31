import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'addaddress',
    loadChildren: () =>
      import('./addaddress/addaddress.module').then(
        (m) => m.AddaddressPageModule
      ),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('./maindelivery/tabs/delivery/delivery.module').then(
        (m) => m.DeliveryPageModule
      ),
  },
  {
    path: 'takeaway',
    loadChildren: () =>
      import('./maindelivery/tabs/takeaway/takeaway.module').then(
        (m) => m.TakeawayPageModule
      ),
  },
  {
    path: 'dinein',
    loadChildren: () =>
      import('./maindelivery/tabs/dinein/dinein.module').then(
        (m) => m.DineinPageModule
      ),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'manageaddress',
    loadChildren: () =>
      import('./manageaddress/manageaddress.module').then(
        (m) => m.ManageaddressPageModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'applyvoucher',
    loadChildren: () =>
      import('./applyvoucher/applyvoucher.module').then(
        (m) => m.ApplyvoucherPageModule
      ),
  },
  {
    path: 'maindelivery',
    loadChildren: () =>
      import('./maindelivery/maindelivery.module').then(
        (m) => m.MaindeliveryPageModule
      ),
  },
  {
    path: 'salad',
    loadChildren: () =>
      import('./maindelivery/category/salad/salad.module').then(
        (m) => m.SaladPageModule
      ),
  },
  {
    path: 'category/side',
    loadChildren: () =>
      import('./maindelivery/category/side/side.module').then(
        (m) => m.SidePageModule
      ),
  },
  {
    path: 'category/pizza',
    loadChildren: () =>
      import('./maindelivery/category/pizza/pizza.module').then(
        (m) => m.PizzaPageModule
      ),
  },
  {
    path: 'category/burger',
    loadChildren: () =>
      import('./maindelivery/category/burger/burger.module').then(
        (m) => m.BurgerPageModule
      ),
  },
  {
    path: 'category/dimatina',
    loadChildren: () =>
      import('./maindelivery/category/dimatina/dimatina.module').then(
        (m) => m.DimatinaPageModule
      ),
  },
  {
    path: 'category/dessert',
    loadChildren: () =>
      import('./maindelivery/category/dessert/dessert.module').then(
        (m) => m.DessertPageModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'applyvoucher',
    loadChildren: () =>
      import('./applyvoucher/applyvoucher.module').then(
        (m) => m.ApplyvoucherPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountPageModule),
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./aboutus/aboutus.module').then((m) => m.AboutusPageModule),
  },  {
    path: 'forgetpasswordverify',
    loadChildren: () => import('./forgetpasswordverify/forgetpasswordverify.module').then( m => m.ForgetpasswordverifyPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'whatson',
    loadChildren: () => import('./whatson/whatson.module').then( m => m.WhatsonPageModule)
  },
  {
    path: 'legalcondition',
    loadChildren: () => import('./legalcondition/legalcondition.module').then( m => m.LegalconditionPageModule)
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
