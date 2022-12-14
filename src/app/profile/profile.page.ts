import { DatePipe } from '@angular/common';
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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  datePipe = new DatePipe('es-US');
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      anniversary: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.authService.accountSubject.subscribe((res: any) => {
      console.log(res);
      res.anniversary_date = new Date(res.anniversary_date);
      res.dateOfBirth = new Date(res.dateOfBirth);
      if (res) {
        this.profileForm.patchValue(res);
        this.profileForm.controls['mobile'].patchValue(res.mobileNo);
        this.profileForm.controls['dateOfBirth'].patchValue(
          this.formatDate(res.dateOfbirth)
        );
        this.profileForm.controls['anniversary'].patchValue(
          this.formatDate(res.anniversary_date)
        );
        this.profileForm.controls['gender'].patchValue(res.gender);
      }
    });
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  saveForm() {
    let data = {
      name: this.name_FormControl.value,
      gender: this.gender_FormControl.value,
      email: this.email_FormControl.value,
      anniversary: this.anniversary_FormControl.value,
      mobile: this.mobile_FormControl.value,
      dateOfBirth: this.dateOfBirth_FormControl.value,
    };

    console.log(data);
    this.authService.editProfile(data).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.profileForm.reset();
          this.router.navigate(['/account']);
        } else {
          this.toastService.presentToast('Error in User Details');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
      },
    });
  }

  get name_FormControl(): FormControl | null {
    return (this.profileForm?.get('name') as FormControl) ?? null;
  }
  get gender_FormControl(): FormControl | null {
    return (this.profileForm?.get('gender') as FormControl) ?? null;
  }
  get email_FormControl(): FormControl | null {
    return (this.profileForm?.get('email') as FormControl) ?? null;
  }
  get anniversary_FormControl(): FormControl | null {
    return (this.profileForm?.get('anniversary') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.profileForm?.get('mobile') as FormControl) ?? null;
  }
  get dateOfBirth_FormControl(): FormControl | null {
    return (this.profileForm?.get('dateOfBirth') as FormControl) ?? null;
  }
}
