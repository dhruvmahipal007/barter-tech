import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  userOrder: any;
  isDataVisible: boolean;
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private global: GlobalService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((res) => {
      // console.log(res);
      // console.log(this.router.url);
      this.getOrders();
    });
  }

  ngOnInit() {}
  getOrders() {
    this.global.showLoader('Loading Data');
    this.authService.getMyOrders().subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.status) {
          this.userOrder = data.data;
          this.global.hideLoader();
          console.log(this.userOrder);
        } else {
          this.isDataVisible = true;
          this.global.hideLoader();
        }
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }
}
