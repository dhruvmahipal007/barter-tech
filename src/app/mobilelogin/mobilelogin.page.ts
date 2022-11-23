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
  selector: 'app-mobilelogin',
  templateUrl: './mobilelogin.page.html',
  styleUrls: ['./mobilelogin.page.scss'],
})
export class MobileloginPage implements OnInit {
  mobileLoginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.mobileLoginForm = this.fb.group({
      mobile: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  submitForm() {}

  get mobile_FormControl(): FormControl | null {
    return (this.mobileLoginForm?.get('mobile') as FormControl) ?? null;
  }
}
