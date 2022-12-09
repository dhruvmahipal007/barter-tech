import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.page.html',
  styleUrls: ['./payment-option.page.scss'],
})
export class PaymentOptionPage implements OnInit {
  url: any;
  billing_addressline1: any;
  billing_addressline2: any;
  company_id: any;
  merchant_Id: any;
  customer_name: any;
  customer_email: any;
  customer_BillingAddress_id: any;
  customer_DeliveryAddress_Id: any;

  orderType: any;
  customer_mobile: any;
  items: any[] = [];
  takeAwayPrice: any;
  cartItems: any[] = [];

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.totalDataSubject.subscribe((res: any) => {
      console.log(res);
      this.billing_addressline1 = res.billing_addressline1;
      this.billing_addressline2 = res.billing_addressline2;
      this.customer_BillingAddress_id = res.customer_BillingAddress_id;
      this.customer_DeliveryAddress_Id = res.customer_BillingAddress_id;
      this.company_id = res.company_id;
      this.merchant_Id = res.merchant_Id;
      this.takeAwayPrice = res.takeAwayPrice;
    });
    this.customer_name = JSON.parse(localStorage.getItem('userDetails')).name;
    this.customer_email = JSON.parse(localStorage.getItem('userDetails')).email;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.customer_mobile = JSON.parse(localStorage.getItem('userNo'));
  }
  presentAlert() {
    var id = document.getElementById('modal');
    id.style.display = 'flex';
  }

  saveCustomerOrder() {
    let obj: any;
    let finalObj: any;
    this.cartItems.map((x: any) => {
      obj = {
        menuItemId: x.menuItemId,
        menuItemName: x.menuItemName,
        unitPrice: x.unitPrice,
        IsoptionApplicable: x.IsoptionApplicable,
        unit: x.unit,
      };
      finalObj = {
        menuItem: obj,
        quantity: x.product_quantity,
      };
      this.items.push(finalObj);
    });
    //console.log(this.items);

    let sendData = {
      merchant_Id: this.merchant_Id,
      company_id: this.company_id,
      billing_addressline1: this.billing_addressline1,
      billing_addressline2: this.billing_addressline2,
      customer_name: this.customer_name,
      customer_mobile: this.customer_mobile,
      customer_email: this.customer_email,
      customer_BillingAddress_id: this.customer_BillingAddress_id,
      customer_DeliveryAddress_Id: this.customer_DeliveryAddress_Id,
      items: this.items,
      options: { optionGroups: [], size: [] },
      optionGroups: [],
      size: [],
      spiceLevel: null,
      takeAwayPrice: this.takeAwayPrice,
      taxId: '4',
      taxclassid: '1',
      taxrate: '10.0000',
      taxvalue_type: 'P',
      orderType: localStorage.getItem('currentRoute'),
    };
    console.log(sendData);
  }
}
