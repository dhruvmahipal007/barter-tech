import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

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
  deliveryCharges: number = 0;
  gst = 0;
  totalPayable = 0;
  currentRoute: any;
  preorderCheckbox: boolean = false;
  checkboxBoolean: boolean = false;
  preorder: any;
  customValuesPrice: number = 0;
  tempdata: any;
  distance: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private global: GlobalService,
    private alertController: AlertController
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

      this.currentRoute = localStorage.getItem('currentRoute');
      this.getAddress();
      // if (this.cartItems?.length > 0 && this.currentRoute == 'delivery') {
      //   this.getAddress();
      // }
    });
    // this.cartItems.map(x =>{
    //   this.customPriceValidate(x);
    // })
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
      this.cartItems.map((x) => {
        if (this.currentRoute == 'delivery') {
          if (x.options.size[0] == null) {
            x.displaySizeValue = x.deliveryPrice;
          } else {
            x.displaySizeValue = x.options.size[0].size_deliveryPrice;
          }
        } else if (this.currentRoute == 'takeaway') {
          if (x.options.size[0] == null) {
            x.displaySizeValue = x.takeAwayPrice;
          } else {
            x.displaySizeValue = x.options.size[0].size_takeawayPrice;
          }
        } else if (this.currentRoute == 'dinein') {
          if (x.options.size[0] == null) {
            x.displaySizeValue = x.dineInPrice;
          } else {
            x.displaySizeValue = x.options.size[0].size_dineInPrice;
          }
        }
        x.taxdisplayAmount = (x.displaySizeValue * x.taxrate) / 100;
        console.log(x.taxdisplayAmount);
      });
      this.customer_name = JSON.parse(localStorage.getItem('userDetails')).name;
      this.customer_email = JSON.parse(
        localStorage.getItem('userDetails')
      ).email;
      this.customer_mobile = JSON.parse(localStorage.getItem('userNo'));
      console.log(this.cartItems);

      this.currentRoute = localStorage.getItem('currentRoute');
      this.cartItems.map((x) => {
        this.customPriceValidate(x);
      });
      if (this.cartItems) {
        this.getItemTotal();
      } else {
        this.cartItems = [];
      }
      for (var key in localStorage) {
        if (key == 'preorder') {
          this.preorder = JSON.parse(localStorage.getItem('preorder'));
          console.log(this.preorder);
        } else {
          this.checkboxBoolean = false;
        }
      }
    });

    if (this.preorder) {
      this.checkboxBoolean = true;
    }

    this.authService.couponSubject.subscribe((res: any) => {
      if (res != 'invalid' && Object.keys(res).length != 0) {
        this.isCouponApplied = true;
        this.isCouponUsed = true;
        this.appliedCoupon = res;
        this.getItemTotal();
      } else if (Object.keys(res).length == 0) {
        this.isCouponUsed = false;
        this.isCouponApplied = false;
      } else if (res == 'invalid') {
        this.isCouponUsed = true;
      }
      console.log(res);
    });
    // this.getAddress();
    setTimeout(() => {
      if (this.currentRoute == 'delivery' && this.cartItems.length > 0) {
        this.presentAlert();
      }
    }, 7000);
  }

  changeRoute() {
    let route = !this.currentRoute ? 'delivery' : this.currentRoute;
    this.router.navigate(['/maindelivery/' + route]);
  }

  subQty(product, index) {
    let removeItems = [];
    let remainingItems = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    if (product.product_quantity < 2) {
      product.product_quantity = product.product_quantity - 1;
      let latestCartItems = JSON.parse(localStorage.getItem('cartItems'));
      latestCartItems.forEach((element) => {
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
      latestCartItems.forEach((element) => {
        productLength += element.product_quantity;
      });
      this.authService.badgeDataSubject.next(productLength);
      // this.customPriceValidateForSub(product);
    } else {
      product.product_quantity = product.product_quantity - 1;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      let productLength = 0;
      this.cartItems.forEach((element) => {
        productLength += element.product_quantity;
      });
      this.authService.badgeDataSubject.next(productLength);
    }
    this.customPriceValidateForSub(product);
    this.getItemTotal();
    if (this.cartItems.length == 0) {
      this.authService.couponSubject.next({});
    }
  }

  addQty(product, index) {
    product.product_quantity = product.product_quantity + 1;
    this.customPriceValidate(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    let productLength = 0;
    this.cartItems.forEach((element) => {
      productLength += element.product_quantity;
    });
    this.getItemTotal();
    this.authService.badgeDataSubject.next(productLength);
  }

  async makePayment() {
    let obj;
    this.preorder = JSON.parse(localStorage.getItem('preorder'));
    if (this.currentRoute == 'delivery') {
      obj = {
        merchant_Id: 68,
        company_id: 1,
        customer_BillingAddress_id: this.selectedAddress.id,
        billing_addressline1: this.selectedAddress.addressLine1,
        billing_addressline2: this.selectedAddress.addressLine2,
        takeAwayPrice: this.totalPayable,
        taxAmount: this.gst,
        deliveryCharge: this.deliveryCharges,
      };
    } else {
      obj = {
        merchant_Id: 68,
        company_id: 1,
        customer_BillingAddress_id: '',
        billing_addressline1: '',
        billing_addressline2: '',
        takeAwayPrice: this.totalPayable,
        taxAmount: this.gst,
        deliveryCharge: this.deliveryCharges,
      };
    }
    if (!this.preorderCheckbox && this.preorder) {
      const alert = await this.alertController.create({
        message: 'Confirm to place Preorder',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.authService.totalDataSubject.next(obj);

              localStorage.removeItem('preorder');
              this.router.navigate([this.router.url, 'payment-option']);
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.preorderCheckbox = true;
              obj.isPreorder = '1';
              obj.delivery_date = this.preorder.selectedDate;
              obj.delivery_time = this.preorder.selectedTime;
              if ((this.preorder.type = 'dinein')) {
                obj.dinein_Customer_count = this.preorder.selectedPeople;
              }
              this.authService.totalDataSubject.next(obj);
              this.router.navigate([this.router.url, 'payment-option']);
            },
          },
        ],
      });

      await alert.present();
    } else if (this.preorderCheckbox && this.preorder) {
      obj.isPreorder = '1';
      obj.delivery_date = this.preorder.selectedDate;
      obj.delivery_time = this.preorder.selectedTime;
      if ((this.preorder.type = 'dinein')) {
        obj.dinein_Customer_count = this.preorder.selectedPeople;
      }
      this.authService.totalDataSubject.next(obj);
      this.router.navigate([this.router.url, 'payment-option']);
    } else {
      this.authService.totalDataSubject.next(obj);
      this.router.navigate([this.router.url, 'payment-option']);
    }
  }

  customPriceValidate(product) {
    product.options.optionGroups.map((y) => {
      y.optionItems.map((z) => {
        if (z.selected) {
          if (this.currentRoute == 'delivery') {
            this.customValuesPrice = this.customValuesPrice + z.deliveryPrice;
            z.displayValue = z.deliveryPrice;
            z.displayOptionValue = z.deliveryPrice;
          } else if (this.currentRoute == 'takeaway') {
            z.displayValue = z.takeawayPrice;
            z.displayOptionValue = z.takeawayPrice;
            this.customValuesPrice = this.customValuesPrice + z.takeawayPrice;
          } else if (this.currentRoute == 'dinein') {
            z.displayValue = z.dineinPrice;
            z.displayOptionValue = z.dineinPrice;
            this.customValuesPrice = this.customValuesPrice + z.dineinPrice;
          }
        }
      });
    });
  }

  customPriceValidateForSub(product) {
    product.options.optionGroups.map((y) => {
      y.optionItems.map((z) => {
        if (z.selected) {
          if (this.currentRoute == 'delivery') {
            this.customValuesPrice = this.customValuesPrice - z.deliveryPrice;
          } else if (this.currentRoute == 'takeaway') {
            this.customValuesPrice = this.customValuesPrice - z.takeawayPrice;
          } else if (this.currentRoute == 'dinein') {
            this.customValuesPrice = this.customValuesPrice - z.dineinPrice;
          }
        }
      });
    });
    // this.router.navigate([this.router.url, 'payment-option']);
    // let obj = {
    //   merchant_Id: 68,
    //   company_id: 1,
    //   customer_BillingAddress_id: this.selectedAddress.id,
    //   billing_addressline1: this.selectedAddress.addressLine1,
    //   billing_addressline2: this.selectedAddress.addressLine2,
    //   takeAwayPrice: this.totalPayable,
    // };
    // this.authService.totalDataSubject.next(obj);
  }

  getItemTotal() {
    this.itemTotal = 0;
    this.gst = 0;
    // if(this.currentRoute=='delivery'){
    //   this.cartItems.map((ele) => {
    //     this.itemTotal = this.itemTotal + ele.deliveryPrice * ele.product_quantity;
    //   });
    // }
    // else if(this.currentRoute=='takeaway'){
    //   this.cartItems.map((ele) => {
    //     this.itemTotal = this.itemTotal + ele.takeAwayPrice * ele.product_quantity;
    //   });
    // }
    // else if(this.currentRoute=='dinein'){
    //   this.cartItems.map((ele) => {
    //     this.itemTotal = this.itemTotal + ele.dineInPrice * ele.product_quantity;
    //   });
    // }

    this.cartItems.map((ele) => {
      this.itemTotal =
        this.itemTotal + Number(ele.displaySizeValue) * ele.product_quantity;
      this.gst = (ele.taxdisplayAmount + this.gst) * ele.product_quantity;
    });
    console.log(this.customValuesPrice);
    this.itemTotal = this.itemTotal + this.customValuesPrice;
    if (this.currentRoute == 'dinein' || this.currentRoute == 'takeaway') {
      this.totalPayable =
        this.itemTotal +
        this.gst -
        (this.appliedCoupon ? this.appliedCoupon.couponValue : 0);
    } else {
      this.totalPayable =
        this.itemTotal +
        this.deliveryCharges +
        this.gst -
        (this.appliedCoupon ? this.appliedCoupon.couponValue : 0);
    }
  }

  remove() {
    this.isCouponApplied = false;
    this.isCouponUsed = false;
    this.appliedCoupon.couponValue = 0;
    this.authService.couponSubject.next({});
    this.getItemTotal();
  }

  getAddress() {
    this.global.showLoader('Loading Data');
    this.authService.getAddress().subscribe({
      next: (data: any) => {
        this.userAddress = data.data;
        this.selectedAddress = this.userAddress[0];
        console.log(this.userAddress);
        this.getDeliveryCharges();
      },
      error: (err) => {
        this.global.hideLoader();
        console.log(err);
      },
    });
  }

  getDeliveryCharges() {
    this.authService.getZipCode().subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.tempdata = data.data;
        this.tempdata.map((x) => {
          if (x.delivery_suburb == this.selectedAddress.suburb) {
            this.distance = x.distance_in_km;
            let obj = {
              distance: this.distance,
            };
            console.log(obj);
            this.authService.getDeliveryCharges(obj).subscribe({
              next: (data: any) => {
                this.deliveryCharges = Number(data.data);
                console.log(this.deliveryCharges);
                this.getItemTotal();
                this.global.hideLoader();
              },
              error: (err) => {
                console.log(err);
                this.global.hideLoader();
              },
            });
          }
        });
      },
      error: (err) => {
        this.global.hideLoader();
        console.log(err);
      },
    });
  }

  onAddressChange(event) {
    console.log(event.target.value);
    this.selectedAddress = event.target.value;
    this.getDeliveryCharges();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Please reconfirm your delivery address',
      buttons: ['OK'],
    });
    await alert.present();
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
