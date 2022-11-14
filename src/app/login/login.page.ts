import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService
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
    const val = this.validateForm.value;
    this.authService.login(val.email, val.password).subscribe({
      next: (data) => {},
      error: (err) => {},
    });
  }
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Email or Password incorrect',
  //     // subHeader: 'Important message',
  //     // message: 'This is an alert!',
  //     buttons: ['OK'],
  //   });

  //   await alert.present();
  // }
}
