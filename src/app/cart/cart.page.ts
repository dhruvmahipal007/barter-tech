import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  selectedAddress: any;
  optionSelected: any;
  cartItems: any[] = [];
  itemTotal: any = 0;
  deliveryCharges = 10;
  gst = 10;
  totalPayable = 0;
  currentRoute: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    console.log('cartttttttttt');
    this.route.params.subscribe((res) => {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
      console.log('cartttttttttt', this.cartItems);

      this.customer_name = JSON.parse(localStorage.getItem('userDetails')).name;
      this.customer_email = JSON.parse(
        localStorage.getItem('userDetails')
      ).email;
      this.customer_mobile = JSON.parse(localStorage.getItem('userNo'));
      // console.log(this.cartItems);
      if (this.cartItems) {
        this.getItemTotal();
      } else {
        this.cartItems = [];
      }
      this.currentRoute = localStorage.getItem('currentRoute');
    });
  }

  ngOnInit() {
    this.getAddress();
    this.authService.couponSubject.subscribe((res: any) => {
      if (res != 'invalid' && Object.keys(res).length != 0) {
        this.isCouponApplied = true;
        this.isCouponUsed = true;
        this.appliedCoupon = res;
        this.getItemTotal();
      } else if (Object.keys(res).length == 0) {
        this.isCouponUsed = false;
      } else if (res == 'invalid') {
        this.isCouponUsed = true;
      }
      console.log(res);
    });
  }

  changeRoute() {
    const route= !this.currentRoute? 'delivery': this.currentRoute
    this.router.navigate(['/maindelivery/' + route]);
  }

  subQty(product, index) {
    let removeItems = [];
    let remainingItems = [];
    console.log(product.product_quantity)
    if (product.product_quantity < 2) {
      product.product_quantity = product.product_quantity - 1;
      let latestCartItems = JSON.parse(localStorage.getItem('cartItems'));
      latestCartItems.forEach(element => {
        if (element.menuItemId == product.menuItemId) {
          removeItems.push(element);
        } else {
          remainingItems.push(element);
        }
      });
      removeItems.pop();
      latestCartItems = removeItems.concat(remainingItems);
      this.cartItems = latestCartItems;
      localStorage.setItem('cartItems', JSON.stringify(latestCartItems));
      let productLength = 0;
      latestCartItems.forEach(element => {
        productLength += element.product_quantity;
      });
      this.authService.badgeDataSubject.next(productLength);
      this.getItemTotal();
    } else {
      product.product_quantity = product.product_quantity - 1;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      let productLength = 0;
      this.cartItems.forEach(element => {
        productLength += element.product_quantity;
      });
      this.authService.badgeDataSubject.next(productLength);
      this.getItemTotal();
    }
  }

  addQty(product, index) {
    product.product_quantity = product.product_quantity + 1;
    this.getItemTotal();
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    let productLength = 0;
    this.cartItems.forEach(element => {
      productLength += element.product_quantity;
    });
    this.authService.badgeDataSubject.next(productLength);

  }

  async makePayment() {
    this.router.navigate([this.router.url, 'payment-option']);
    let obj = {
      merchant_Id: 45,
      company_id: 1,
      customer_BillingAddress_id: this.selectedAddress.id,
      billing_addressline1: this.selectedAddress.addressLine1,
      billing_addressline2: this.selectedAddress.addressLine2,
      takeAwayPrice: this.totalPayable,
    };
    this.authService.totalDataSubject.next(obj);
  }

  getItemTotal() {
    this.itemTotal = 0;
    this.cartItems.map((ele) => {
      this.itemTotal = this.itemTotal + ele.unitPrice * ele.product_quantity;
    });
    this.totalPayable =
      this.itemTotal +
      this.deliveryCharges +
      this.gst -
      (this.appliedCoupon ? this.appliedCoupon.couponValue : 0);
  }

  remove() {
    this.isCouponApplied = false;
    this.isCouponUsed = false;
    this.appliedCoupon.couponValue = 0;
    this.getItemTotal();
  }

  getAddress() {
    this.authService.getAddress().subscribe({
      next: (data: any) => {
        this.userAddress = data.data;
        this.selectedAddress = this.userAddress[0];
        console.log(this.userAddress);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAddressChange(event) {
    console.log(event.target.value);
    this.selectedAddress = event.target.value;
  }

  // saveCustomerOrder() {
  //   let obj = {
  //     merchant_Id: 4,
  //     company_id: 1,
  //     billing_addressline1: this.selectedAddress.addressLine1,
  //     billing_addressline2: this.selectedAddress.addressLine2,
  //   };
  // }
}
