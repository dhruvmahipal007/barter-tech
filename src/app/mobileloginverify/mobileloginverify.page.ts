import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-mobileloginverify',
  templateUrl: './mobileloginverify.page.html',
  styleUrls: ['./mobileloginverify.page.scss'],
})
export class MobileloginverifyPage implements OnInit {
  mobileLoginVerifyForm: FormGroup;
  mobileObj = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.mobileLoginVerifyForm = this.fb.group({
      otp: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.authService.mobileNumberSubject.subscribe((res: any) => {
      this.mobileObj = res;
    });
  }
  resendOtp() {
    this.authService.requestOtp(this.mobileObj).subscribe({
      next: (data) => {
        console.log(data);
        this.toastService.presentToast('OTP sent successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submitForm() {
    let data = {
      otp: this.otp_FormControl.value,
    };
    console.log(data);
    this.authService.mobileLoginVerify(data).subscribe({
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
          this.mobileLoginVerifyForm.reset();
        } else {
          this.toastService.presentToast('Incorrect OTP');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err.error.message);
      },
    });
  }

  get otp_FormControl(): FormControl | null {
    return (this.mobileLoginVerifyForm?.get('otp') as FormControl) ?? null;
  }
}
