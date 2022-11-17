import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { matchValidator } from '../validators/match.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  validateForm: FormGroup;
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: matchValidator('newPassword', 'confirmPassword') }
    );
  }

  ngOnInit() {}
}
