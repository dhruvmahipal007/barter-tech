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

  ngOnInit() {}
  submitForm() {}

  get otp_FormControl(): FormControl | null {
    return (this.mobileLoginVerifyForm?.get('otp') as FormControl) ?? null;
  }
}
