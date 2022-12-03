import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-applyvoucher',
  templateUrl: './applyvoucher.page.html',
  styleUrls: ['./applyvoucher.page.scss'],
})
export class ApplyvoucherPage implements OnInit {
  isDataVisible: boolean;
  couponList: any[] = [];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.getVouchers();
  }

  getVouchers() {
    this.global.showLoader('Loading Data');
    this.authService.getVouchers().subscribe({
      next: (data: any) => {
        if (data.status) {
          data.data.map((ele) => {
            let objData = {
              couponCode: ele.couponcode.trim(),
              couponValue: ele.couponvalue,
              couponName: ele.couponName,
              couponTitle: ele.couponTitle,
              couponDesc: ele.couponDesc,
            };
            this.couponList.push(objData);
          });
          this.global.hideLoader();
        } else {
          // this.toastService.presentToast(data.message);
          this.isDataVisible = true;
          this.global.hideLoader();
        }
        console.log(data);
        console.log(this.couponList);
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }
  applyCoupon(value) {
    console.log(value);
    this.couponList.map((ele) => {
      if (ele.couponCode.toLowerCase() == value.toLowerCase()) {
        console.log('Entered');
        this.authService.couponSubject.next(ele);
      } else {
        this.authService.couponSubject.next('invalid');
      }
      this.router.navigate(['/cart']);
    });
  }

  existedCouponApplied(element: any) {
    this.authService.couponSubject.next(element);
    this.router.navigate(['/cart']);
  }
}
