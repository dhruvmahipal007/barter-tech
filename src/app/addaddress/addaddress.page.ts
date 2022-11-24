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
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {
  addAddressForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.addAddressForm = this.fb.group({
      tag: [null, [Validators.required]],
      address: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  addAddress() {
    let data = {
      tag: this.tag_FormControl.value,
      address: this.address_FormControl.value,
      zipcode: this.pincode_FormControl.value,
      landmark: this.landmark_FormControl.value,
      mobile: this.mobile_FormControl.value,
    };
    console.log(data);
    this.authService.addAddress(data).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.addAddressForm.reset();
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
    return (this.addAddressForm?.get('tag') as FormControl) ?? null;
  }
  get address_FormControl(): FormControl | null {
    return (this.addAddressForm?.get('address') as FormControl) ?? null;
  }
  get pincode_FormControl(): FormControl | null {
    return (this.addAddressForm?.get('pincode') as FormControl) ?? null;
  }
  get landmark_FormControl(): FormControl | null {
    return (this.addAddressForm?.get('landmark') as FormControl) ?? null;
  }
  get mobile_FormControl(): FormControl | null {
    return (this.addAddressForm?.get('mobile') as FormControl) ?? null;
  }
}
