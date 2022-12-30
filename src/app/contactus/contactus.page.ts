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
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
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
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)],],
      note: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  submitForm() {

    for (const i in this.contactUsForm.controls) {
      this.contactUsForm.controls[i].markAsDirty();
      this.contactUsForm.controls[i].updateValueAndValidity();
    }
    if (this.contactUsForm.invalid) {
      return;
    }
    this.contactUs();
  }
  contactUs() {
    if (
      this.mobile_FormControl.value.toString().length < 10 ||
      this.mobile_FormControl.value.toString().length > 10
    ) {
      this.toastService.presentToast('Please enter a valid no');
    }
    else{

    
    let data = {
      firstName: this.firstName_FormControl.value,
      lastName: this.lastName_FormControl.value,
      email: this.email_FormControl.value,
      mobile: '91'+ this.mobile_FormControl.value,
      note: this.note_FormControl.value,
    };
    console.log('-----------------data contact us-----------', data);
    this.authService.contactUs(data).subscribe({
      next: (data) => {
        
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.contactUsForm.reset();
          this.router.navigate(['/account']);
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
  }
  get officialEmail() {
    return this.contactUsForm.get('email');
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
