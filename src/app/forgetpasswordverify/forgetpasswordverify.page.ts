import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { matchValidator } from '../validators/match.validator';

@Component({
  selector: 'app-forgetpasswordverify',
  templateUrl: './forgetpasswordverify.page.html',
  styleUrls: ['./forgetpasswordverify.page.scss'],
})
export class ForgetpasswordverifyPage implements OnInit {
  forgotPassVerifyform: FormGroup;
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.forgotPassVerifyform = this.fb.group(
      {
        otp: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: matchValidator('newPassword', 'confirmPassword') }
    );
  }

  ngOnInit() {}

  submitForm() {
    if (this.forgotPassVerifyform.invalid) return;
    this.isLoading = true;
    this.authService
      .forgetPassVerify(
        this.otp_FormControl?.value,
        this.newPassword_FormControl?.value
      )
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.toastService.presentToast(data.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.forgotPassVerifyform.reset();
          }, 3000);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.presentToast(err);
        },
      });
  }

  get otp_FormControl(): FormControl | null {
    return (this.forgotPassVerifyform?.get('otp') as FormControl) ?? null;
  }

  get newPassword_FormControl(): FormControl | null {
    return (
      (this.forgotPassVerifyform?.get('newPassword') as FormControl) ?? null
    );
  }
}
