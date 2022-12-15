import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Plugins, registerWebPlugin } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  device_model: any;
  device_platform: any;
  device_uuid: any;
  device_version: any;
  device_manufacturer: any;
  device_serial: any;
  registration_id: any;
  validateForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private storage: StorageService
  ) {
    this.validateForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [null, [Validators.required]],
    });
    // this.authService.testData().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
  // ionViewDidEnter() {
  //   GoogleAuth.init();
  // }

  async loginwithgoogle() {
    const googleUser = await GoogleAuth.signIn();
    const obj={
      "login_type" : "social",
      "email" : googleUser.email,
      "social_id" : googleUser.id,
      "name" : googleUser.givenName,
      // "registration_token": JSON.parse(localStorage.getItem('fcm_token')),
    }
    console.log('my user: ', googleUser);
    this.authService.login(obj).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) {
          localStorage.setItem(
            'token',
            data.data.userToken.original.access_token
          );
          // this.storage.store(
          //   'token',
          //   data.data.userToken.original.access_token
          // );
          localStorage.setItem(
            'userDetails',
            JSON.stringify(data.data.UserData)
          );
          // this.storage.store('userDetails', data.data.UserData);
          this.toastService.presentToast(data.message);
          this.router.navigate(['/account']);
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
        console.log(err);
      },
    });
  }
   
  

  ngOnInit() {
    this.isLoggedIn();
    this.getDeviceInfo();
  }
  getDeviceInfo() {
    Device.getInfo().then((val: any) => {
      this.device_model = val.model;
      this.device_platform = val.platform;
      this.device_uuid = val.uuid;
      this.device_version = val.appVersion;
      this.device_manufacturer = val.manufacturer;
    });
  }
  async isLoggedIn() {
    try {
      const token = await this.authService.getToken();
      if (!!token) {
        this.router.navigate(['/account']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  loginwithfacebook() {
    // $ keytool -exportcert -alias androiddebugkey -keystore "C:\Documents and Settings\Administrator.android\debug.keystore" | "C:\OpenSSL\bin\openssl" sha1 -binary |"C:\OpenSSL\bin\openssl" base64

  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.signIn();
  }
  signIn() {
    let data = {
      email: this.validateForm.controls['email'].value,
      password: this.validateForm.controls['password'].value,
      // device_model: this.device_model,
      // device_platform: this.device_platform,
      // device_uuid: this.device_uuid,
      // device_version: this.device_version,
      // device_manufacturer: this.device_manufacturer,
      // registration_token: JSON.parse(localStorage.getItem('fcm_token')),
    };
    console.log(data);
    this.authService.login(data).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem(
            'token',
            data.data.userToken.original.access_token
          );
          // this.storage.store(
          //   'token',
          //   data.data.userToken.original.access_token
          // );
          localStorage.setItem(
            'userDetails',
            JSON.stringify(data.data.UserData)
          );
          // this.storage.store('userDetails', data.data.UserData);
          this.toastService.presentToast(data.message);
          this.router.navigate(['/account']);
          this.validateForm.reset();
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
        console.log(err);
      },
    });
  }

  get officialEmail() {
    return this.validateForm.get('email');
  }

  get email_FormControl(): FormControl | null {
    return (this.validateForm?.get('email') as FormControl) ?? null;
  }
  get password_FormControl(): FormControl | null {
    return (this.validateForm?.get('password') as FormControl) ?? null;
  }
}
