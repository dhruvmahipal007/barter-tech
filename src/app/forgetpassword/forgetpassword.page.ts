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
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (this.forgotPasswordForm.invalid) return;
    this.isLoading = true;
    this.forgotPasswordForm.get('email').disable();
    this.authService.forgetPass(this.email_FormControl.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.presentToast(
          'Reset Password Link is sent to your Email Address'
        );
        setTimeout(() => {
          this.router.navigate(['/forgetpasswordverify']);
          this.forgotPasswordForm.reset();
          this.email_FormControl.enable();
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.presentToast(err);
      },
    });
  }

  get officialEmail() {
    return this.forgotPasswordForm.get('email');
  }
  get email_FormControl(): FormControl | null {
    return (this.forgotPasswordForm?.get('email') as FormControl) ?? null;
  }
}
