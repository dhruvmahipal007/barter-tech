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
    if (
      this.otp_FormControl.value.toString().length < 6 ||
      this.otp_FormControl.value.toString().length > 6
    ) {
      this.toastService.presentToast('The unique code must be at least 6 characters');
    }
    else{

    
    if (this.forgotPassVerifyform.invalid) return;
    this.isLoading = true;
    let data = {
      uniqueCode: this.otp_FormControl.value,
      password: this.newPassword_FormControl.value,
    };
    console.log(data);
    this.authService.forgetPassVerify(data).subscribe({
      next: (data) => {
        if(data.status){

        
        console.log(data);
        this.isLoading = false;
        this.toastService.presentToast(data.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.forgotPassVerifyform.reset();
        }, 3000);
      }
      else{
        this.toastService.presentToast('Unique code not matched');
      }
      },
      error: (err) => {
        this.isLoading = false;
        this.forgotPassVerifyform.reset();
        this.toastService.presentToast(err);
      },
    });
  }
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
