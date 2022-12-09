import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Device } from '@capacitor/device';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  device_model: any;
  device_platform: any;
  device_uuid: any;
  device_version: any;
  device_manufacturer: any;
  device_serial: any;
  registration_id: any;
  validateForm1: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private storage: StorageService,
    private router: Router
  ) {
    this.validateForm1 = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
    });
  }

  ngOnInit() {
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

  submitForm() {
    if (!this.validateForm1.valid) return;
    let data = {
      firstName: this.firstName_FormControl.value,
      lastName: this.lastName_FormControl.value,
      email: this.email_FormControl.value,
      mobile: this.mobile_FormControl.value,
      gender: this.gender_FormControl.value,
      dateOfBirth: this.dateOfBirth_FormControl.value,
      password: this.password_FormControl.value,

      merchant_id: 4,
      // device_model: this.device_model,
      // device_platform: this.device_platform,
      // device_uuid: this.device_uuid,
      // device_version: this.device_version,
      // device_manufacturer: this.device_manufacturer,
      // registration_token: JSON.parse(localStorage.getItem('fcm_token')),
    };

    console.log('-----------------data signup-----------', data);
    this.authService.registerUser(data).subscribe(
      (res) => {
        if (res.status) {
          // this.storage.store('token', res.data[0].data.token);
          // this.storage.store('userDetails', res.data[0].data);
          localStorage.setItem('token', res.data[0].data.token);
          localStorage.setItem('userDetails', res.data[0].data);
          this.toastService.presentToast(res.message);
          this.router.navigate(['/account']);
          this.validateForm1.reset();
        }
        // else{
        //   this.toastService.presentToast();
        // }
      },
      (error) => {
        this.toastService.presentToast(error);
      }
    );
  }

  get firstName_FormControl(): FormControl | null {
    return (this.validateForm1?.get('firstName') as FormControl) ?? null;
  }
  get lastName_FormControl(): FormControl | null {
    return (this.validateForm1?.get('lastName') as FormControl) ?? null;
  }
  get email_FormControl(): FormControl | null {
    return (this.validateForm1?.get('email') as FormControl) ?? null;
  }
  get password_FormControl(): FormControl | null {
    return (this.validateForm1?.get('password') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.validateForm1?.get('mobile') as FormControl) ?? null;
  }
  get dateOfBirth_FormControl(): FormControl | null {
    return (this.validateForm1?.get('dateOfBirth') as FormControl) ?? null;
  }
  get gender_FormControl(): FormControl | null {
    return (this.validateForm1?.get('gender') as FormControl) ?? null;
  }
}
