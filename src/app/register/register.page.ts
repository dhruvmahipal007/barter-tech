import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validateForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastService: ToastService
  ) {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  submitForm() {
    if (!this.validateForm.valid) return;
    let data = {
      firstName: this.firstName_FormControl.value,
      lastName: this.lastName_FormControl.value,
      email: this.email_FormControl.value,
      password: this.password_FormControl.value,
      mobile: this.mobile_FormControl.value,
      dateOfBirth: this.dateOfBirth_FormControl.value,
      merchant_id: 4,
    };

    console.log('-----------------data signup-----------', data);
    this.authService.registerUser(data).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get firstName_FormControl(): FormControl | null {
    return (this.validateForm?.get('firstName') as FormControl) ?? null;
  }
  get lastName_FormControl(): FormControl | null {
    return (this.validateForm?.get('lastName') as FormControl) ?? null;
  }
  get email_FormControl(): FormControl | null {
    return (this.validateForm?.get('email') as FormControl) ?? null;
  }
  get password_FormControl(): FormControl | null {
    return (this.validateForm?.get('password') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.validateForm?.get('mobile') as FormControl) ?? null;
  }
  get dateOfBirth_FormControl(): FormControl | null {
    return (this.validateForm?.get('dateOfBirth') as FormControl) ?? null;
  }
}
