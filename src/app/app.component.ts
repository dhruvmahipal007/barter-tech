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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private location: Location
  ) {
    this.storage.create();
    this.initializeApp();
    this.intialize();
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
