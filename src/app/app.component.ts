import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonRouterOutlet, Platform, ToastController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  geoAddress: any;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private location: Location,
    private nativegeocoder: NativeGeocoder
  ) {
    this.storage.create();
    this.initializeApp();
    this.intialize();
    this.fetchLocation();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize({
        clientId:
          '737194284758-c9eutvgthupd9qhjoqa350vhj95n3aka.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    });
  }
  intialize() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   this.routerOutlets.forEach(async () => {
    //     console.log(this.router.url + 'hello');
    //     if (this.router.url !== '/account') {
    //       await this.location.back();
    //     }
    //   });
    // });

    this.platform.backButton.subscribe(async () => {
      var url = this.router['routerState'].snapshot.url;
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack() && url !== '/account') {
          outlet.pop();
        }
      });
    });
  }

  async fetchLocation() {
    const location = await Geolocation.getCurrentPosition();
    console.log('location=', location);
    this.nativegeocoder
      .reverseGeocode(
        location.coords.latitude,
        location.coords.longitude,
        this.options
      )
      .then((result: NativeGeocoderResult[]) => {
        console.log('result=', result);
        console.log('result 0=', result[0]);

        this.geoAddress = this.generateAddress(result[0]);

        console.log('location address= ', this.geoAddress);
      });
  }
  //Return Comma separated address
  generateAddress(addressObj) {
    let obj = [];
    let uniqueNames = [];
    let address = '';
    for (let key in addressObj) {
      if (key != 'areasOfInterest') {
        obj.push(addressObj[key]);
      }
    }
    var i = 0;
    obj.forEach((value) => {
      if (uniqueNames.indexOf(obj[i]) === -1) {
        uniqueNames.push(obj[i]);
      }
      i++;
    });

    uniqueNames.reverse();
    for (let val in uniqueNames) {
      if (uniqueNames[val].length) address += uniqueNames[val] + ', ';
    }
    return address.slice(0, -2);
  }

  ngOnInit() {
    console.log('Initializing HomePage');

    // // Request permission to use push notifications
    // // iOS will prompt user and return if they granted permission or not
    // // Android will just grant without prompting
    // PushNotifications.requestPermissions().then((result) => {
    //   console.log('starting', result);
    //   if (result.receive === 'granted') {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });

    // PushNotifications.addListener('registration', (token: Token) => {
    //   alert('Push registration success, token: ' + token.value);
    // });

    // PushNotifications.addListener('registrationError', (error: any) => {
    //   alert('Error on registration: ' + JSON.stringify(error));
    // });

    // PushNotifications.addListener(
    //   'pushNotificationReceived',
    //   (notification: PushNotificationSchema) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   }
    // );

    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   (notification: ActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );
  }
}
