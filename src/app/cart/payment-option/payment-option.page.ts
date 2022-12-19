import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Stripe } from '@capacitor-community/stripe';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { Subscriber } from 'rxjs';
import { first } from 'rxjs/operators';
// import { Stripe } from '@capacitor-community/Stripe';
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

  constructor(public router: Router, private authService: AuthService, private http: HttpClient) {
    Stripe.initialize({
    publishableKey:  "pk_test_HQcvhQfP6gImSm0PUpGA1xSf"
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
    this.makePaymentWithStripe(); //function call to invoke creating payment sheet
  }

  async makePaymentWithStripe() {

    console.log("Pay with stripe button hits");

    (async () => { this.http.post<{
        paymentIntent?: string;
        client_secret?: string;
        data?: any;
      }>("http://barter-tech.antino.ca/api/testIntent", 
        {
          amount: this.takeAwayPrice * 100,
          currency: "usd",
          payment_method_types: ["card"]
        }
      ).toPromise(Promise)
      .then(res => {
        this.callForStripePayment(res.data.client_secret).then(response=>{
          this.sendingConfirmation(res.data.id, response)
        })
      }).catch(err =>{
        console.log(err)
      });

    })();
  }

  async callForStripePayment(client_secret: any) {
    await Stripe.createPaymentSheet({
      paymentIntentClientSecret: client_secret, 
      merchantDisplayName: 'Barter Tech',
    })

    // present PaymentSheet and get result.
    const result = await Stripe.presentPaymentSheet();

    if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      this.router.navigateByUrl("/maindelivery/delivery");
    }

    if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
      console.log("Retry payment")
      this.router.navigateByUrl("/cart/payment-option");
    }

    if (result.paymentResult === PaymentSheetEventsEnum.Failed) {
      console.log("Payment failed redirect to cart")
      this.router.navigateByUrl("/cart");
    }

    return new Promise((resolve,reject)=>{
      try {
        resolve(result?.paymentResult)
      } catch (error) {
        reject(error)
      }
    })
    // this.sendingConfirmation();
  }

  sendingConfirmation(responseId :any, paymentResultStatus: any){
    console.log(responseId, paymentResultStatus )
    return this.http.post<any>("http://barter-tech.antino.ca/api/Statusupdate" , 
      {
        id : responseId,
        paymentResult : paymentResultStatus, 
      }
    );
  }
}

  //  async makePaymentWithStripe() {
  //   // console.log(this.clientSecretId);
  //   console.log("I ran")
  //   try{
  //     const res = await Stripe.presentPaymentSheet();
  //     console.log({res});
  //   }
  //   catch(err) {
  //     console.log({err});
  //   }
  // }

  // async fetchingStripeData() {
  //   const res = await fetch("http://localhost:8080/create-intent", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "amount": 345,
  //       "currency": "usd",
  //       "payment_method_types": ["card"]
  //     })
  //   })

  //   const data = await res.json();
  //   this.clientSecretId = data.client_secret;

  //   console.log(this.clientSecretId)
  //   console.log(data)

  //   console.log("try to create payment sheet")

  //   await Stripe.createPaymentSheet({
  //     paymentIntentClientSecret: data.client_secret, merchantDisplayName: 'Berter Tech' 
  //   }).then(() => console.log("runn")).catch(err => (console.log(err)));

