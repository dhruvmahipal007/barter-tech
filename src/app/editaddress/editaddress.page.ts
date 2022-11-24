import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {
  editAddressForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.editAddressForm = this.fb.group({
      tag: [null, [Validators.required]],
      address: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      address_id: [null],
    });
  }

  ngOnInit() {
    this.geteditTable();
  }

  geteditTable() {
    this.authService.addressSubject.subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.editAddressForm.controls['address'].patchValue(res.addressLine1);
        this.editAddressForm.controls['landmark'].patchValue(res.addressLine2);
        this.editAddressForm.controls['mobile'].patchValue(res.mobileNo);
        this.editAddressForm.controls['address_id'].patchValue(res.id);
        this.editAddressForm.patchValue(res);
      }
    });
  }
  editAddress() {
    this.authService.editAddress(this.editAddressForm.value).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.editAddressForm.reset();
          this.router.navigate(['/manageaddress']);
        } else {
          this.toastService.presentToast('Error in User Details');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
      },
    });
  }
  get tag_FormControl(): FormControl | null {
    return (this.editAddressForm?.get('tag') as FormControl) ?? null;
  }
  get address_FormControl(): FormControl | null {
    return (this.editAddressForm?.get('address') as FormControl) ?? null;
  }
  get zipcode_FormControl(): FormControl | null {
    return (this.editAddressForm?.get('pincode') as FormControl) ?? null;
  }
  get landmark_FormControl(): FormControl | null {
    return (this.editAddressForm?.get('landmark') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.editAddressForm?.get('mobile') as FormControl) ?? null;
  }
}
