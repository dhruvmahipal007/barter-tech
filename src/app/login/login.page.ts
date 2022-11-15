import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
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
      email: this.email_FormControl.value,
      password: this.password_FormControl.value,
    };
    console.log(data);
    this.authService.login(data).subscribe({
      next: (data) => {
        console.log(data);
        // if(){

        // }else{

        //   this.toastService.presentToast('Incorrect username or password');
        // }
      },
      error: (err) => {
        this.toastService.presentToast('Network connection error');
      },
    });
  }

  get email_FormControl(): FormControl | null {
    return (this.validateForm?.get('email') as FormControl) ?? null;
  }
  get password_FormControl(): FormControl | null {
    return (this.validateForm?.get('password') as FormControl) ?? null;
  }
}
