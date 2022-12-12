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
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {
  contactUsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.contactUsForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      email: [null, [Validators.required]],
      note: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  submitForm() {
    this.contactUs();
  }
  contactUs() {
    let data = {
      firstName: this.firstName_FormControl.value,
      lastName: this.lastName_FormControl.value,
      email: this.email_FormControl.value,
      mobile: this.mobile_FormControl.value,
      note: this.note_FormControl.value,
    };
    console.log('-----------------data contact us-----------', data);
    this.authService.contactUs(data).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.contactUsForm.reset();
        } else {
          this.toastService.presentToast('Error in User Details');
        }
      },
      error: (err) => {
        console.log(err);
        const {firstName,email  } = err.error
        this.toastService.presentToast(firstName || email);
      },
    });
  }

  get firstName_FormControl(): FormControl | null {
    return (this.contactUsForm?.get('firstName') as FormControl) ?? null;
  }
  get lastName_FormControl(): FormControl | null {
    return (this.contactUsForm?.get('lastName') as FormControl) ?? null;
  }
  get email_FormControl(): FormControl | null {
    return (this.contactUsForm?.get('email') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.contactUsForm?.get('mobile') as FormControl) ?? null;
  }
  get note_FormControl(): FormControl | null {
    return (this.contactUsForm?.get('note') as FormControl) ?? null;
  }
}
