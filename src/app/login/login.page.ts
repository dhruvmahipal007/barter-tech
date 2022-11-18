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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validateForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
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
    };
    console.log(data);
    this.authService.login(data).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem(
            'token',
            data.data.userToken.original.access_token
          );
          localStorage.setItem('userDetails', data.data.UserData);
          this.toastService.presentToast(data.message);
          this.router.navigate(['/account']);
          this.validateForm.reset();
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
      error: (err) => {
        this.toastService.presentToast('Network connection error');
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
