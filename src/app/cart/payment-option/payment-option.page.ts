import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Stripe,
  PaymentSheetEventsEnum,
  ApplePayEventsEnum,
  GooglePayEventsEnum,
} from '@capacitor-community/stripe';
import { AlertController } from '@ionic/angular';
import { async, Subscriber } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.page.html',
  styleUrls: ['./payment-option.page.scss'],
})
export class PaymentOptionPage implements OnInit {
  url: any;

  orderType: any;
  customer_mobile: any;
  items: any[] = [];
  takeAwayPrice: any;
  cartItems: any[] = [];

  payment_method_types: any[] = [];
  platform: any;

  clientSecretId: any;
  billing_addressline1: any;
  billing_addressline2: any;
  customer_BillingAddress_id: any;
  customer_DeliveryAddress_Id: any;
  company_id: any;
  merchant_Id: any;
  customer_name: any;
  customer_email: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public alertCtrl: AlertController
  ) {
    Stripe.initialize({
      // publishableKey: 'pk_test_HQcvhQfP6gImSm0PUpGA1xSf', //clients
      publishableKey:
        'pk_test_51MBdEcSF30jh4yGpir3CLpJIEJvWnNJuqmTwVuxahkANEYzXRzgx8iveT6mI9BK7wMbrfO8oAexXkBohQdN7L7Xx00GQ0s32Nm', //test personal
    });
  }

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

    Stripe.addListener(PaymentSheetEventsEnum.Loaded, () => {
      // this.processSheet = 'Ready';
      console.log('PaymentSheetEventsEnum.Loaded');
    });

    Stripe.addListener(PaymentSheetEventsEnum.FailedToLoad, () => {
      console.log('PaymentSheetEventsEnum.FailedToLoad');
    });

    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Completed');
    });

    Stripe.addListener(PaymentSheetEventsEnum.Canceled, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Canceled');
    });

    Stripe.addListener(PaymentSheetEventsEnum.Failed, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Failed');
    });

    Stripe.addListener(GooglePayEventsEnum.Loaded, () => {
      // this.processSheet = 'Ready';
      console.log('PaymentSheetEventsEnum.Loaded');
    });

    Stripe.addListener(GooglePayEventsEnum.FailedToLoad, () => {
      console.log('PaymentSheetEventsEnum.FailedToLoad');
    });

    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Completed');
    });

    Stripe.addListener(GooglePayEventsEnum.Canceled, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Canceled');
    });

    Stripe.addListener(GooglePayEventsEnum.Failed, () => {
      // this.processSheet = 'willReady';
      console.log('PaymentSheetEventsEnum.Failed');
    });
  }

  presentAlert() {
    var id = document.getElementById('modal');
    id.style.display = 'flex';
  }

  payWithCard() {
    this.makePaymentWithStripe();
    this.saveCustomerOrder();
  }

  payWithGpay() {
    this.makePaymentWithGpay();
    this.saveCustomerOrder();
  }

  payWithApplePay() {
    this.makePaymentWithApplePay();
    this.saveCustomerOrder();
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

  async makePaymentWithStripe() {
    console.log('Pay with stripe button hits');

    (async () => {
      this.http
        .post<{
          paymentIntent?: string;
          client_secret?: string;
          data?: any;
        }>('https://barter-tech.antino.ca/api/createIntent', {
          amount: this.takeAwayPrice * 100,
          currency: 'inr',
          payment_method_types: ['card'],
        })
        .toPromise(Promise)
        .then((res) => {
          this.callForStripePayment(res.data.client_secret).then((response) => {
            this.sendingConfirmation(res.data.id, response);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }

  async callForStripePayment(client_secret: any) {
    await Stripe.createPaymentSheet({
      paymentIntentClientSecret: client_secret,
      merchantDisplayName: 'Barter Tech',
    });

    // present PaymentSheet and get result.
    const result = await Stripe.presentPaymentSheet();

    if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      this.router.navigateByUrl('/maindelivery/delivery');
    }

    if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
      console.log('Retry payment');
      this.router.navigateByUrl('/cart/payment-option');
    }

    if (result.paymentResult === PaymentSheetEventsEnum.Failed) {
      console.log('Payment failed redirect to cart');
      this.router.navigateByUrl('/cart');
    }

    return new Promise((resolve, reject) => {
      try {
        resolve(result?.paymentResult);
      } catch (error) {
        reject(error);
      }
    });
    // this.sendingConfirmation();
  }

  async makePaymentWithGpay() {
    console.log('Pay with Gpay button hits');

    (async () => {
      // Check to be able to use Google Pay on device
      const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
      if (isAvailable === undefined) {
        const alert = await this.alertCtrl.create({
          header: 'Gpay Not Available',
          subHeader: 'For yu device',
          message: 'Please chose another payment meho as gpayisno aailable on this device',
          buttons: ['OK'],
        });
        return;
      }

      // Connect to your backend endpoint, and get paymentIntent.
      this.http.post<{
          paymentIntent: string;
          client_secret?: string;
          data?: any;
        }>('https://barter-tech.antino.ca/api/createIntent', {
          amount: this.takeAwayPrice * 100,
          currency: 'inr',
          payment_method_types: ['card'],
        })
        .toPromise(Promise)
        .then((res) => {
          this.callForGpayPayment(res.data.client_secret).then((response) => {
            this.sendingConfirmation(res.data.id, response);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }

  async callForGpayPayment(client_secret: any) {
    await Stripe.createGooglePay({
      paymentIntentClientSecret: client_secret,
      // merchantDisplayName: 'Barter Tech',
    });

    // Present Google Pay
    const result = await Stripe.presentGooglePay();

    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.router.navigateByUrl('/maindelivery/delivery');
    }

    if (result.paymentResult === GooglePayEventsEnum.Canceled) {
      console.log('Retry payment');
      this.router.navigateByUrl('/cart/payment-option');
    }

    if (result.paymentResult === GooglePayEventsEnum.Failed) {
      console.log('Payment failed redirect to cart');
      this.router.navigateByUrl('/cart');
    }

    return new Promise((resolve, reject) => {
      try {
        resolve(result?.paymentResult);
      } catch (error) {
        reject(error);
      }
    });
    // this.sendingConfirmation();
  }

  async makePaymentWithApplePay() {
    console.log('Need Macbk to implement tis.');
  }

  //confirmation API code _ Legacy do not touch

  sendingConfirmation(responseId: any, paymentResultStatus: any) {
    console.log(responseId, paymentResultStatus);
    return this.http.post<any>(
      'http://barter-tech.antino.ca/api/Statusupdate',
      {
        id: responseId,
        paymentResult: paymentResultStatus,
      }
    );
  }
}
