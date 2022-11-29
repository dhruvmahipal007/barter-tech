import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: Storage, private platform: Platform) {
    this.storage.create();
    this.initializeApp();
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
