import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetpasswordverifyPage } from './forgetpasswordverify.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetpasswordverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetpasswordverifyPageRoutingModule {}
