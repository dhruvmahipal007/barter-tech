import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { matchValidator } from '../validators/match.validator';

@Component({
  selector: 'app-forgetpasswordverify',
  templateUrl: './forgetpasswordverify.page.html',
  styleUrls: ['./forgetpasswordverify.page.scss'],
})
export class ForgetpasswordverifyPage implements OnInit {
  validateForm: FormGroup;
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group(
      {
        otp: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: matchValidator('newPassword', 'confirmPassword') }
    );
  }

  ngOnInit() {}
}
