import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  quantity: number = 1;
  isCouponApplied: boolean;
  isCouponUsed: boolean = false;
  appliedCoupon: any;
  customer_name: any;
  customer_email: any;
  customer_mobile: any;
  userAddress: any;
  currentAddress: any;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.customer_name = JSON.parse(localStorage.getItem('userDetails')).name;
    this.customer_email = JSON.parse(localStorage.getItem('userDetails')).email;
    this.customer_mobile = JSON.parse(localStorage.getItem('userNo'));
    this.getAddress();
    this.authService.couponSubject.subscribe((res: any) => {
      if (res != 'invalid' && Object.keys(res).length != 0) {
        this.isCouponApplied = true;
        this.isCouponUsed = true;
        this.appliedCoupon = res;
      } else if (Object.keys(res).length == 0) {
        this.isCouponUsed = false;
      } else if (res == 'invalid') {
        this.isCouponUsed = true;
      }
      console.log(res);
    });
  }
  i = 1;
  plus() {
    this.i++;
    this.quantity = this.i;
  }
  minus() {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i;
    }
  }
  async makePayment() {
    this.router.navigate([this.router.url, 'payment-option']);
  }
  remove() {
    this.isCouponApplied = false;
    this.isCouponUsed = false;
  }
  getAddress() {
    this.authService.getAddress().subscribe({
      next: (data: any) => {
        this.userAddress = data.data;
        this.currentAddress = this.userAddress[21];
        console.log(this.userAddress);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
