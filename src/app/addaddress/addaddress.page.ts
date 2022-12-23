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
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {
  addAddressForm: FormGroup;
  userAddress:any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private global: GlobalService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.addAddressForm = this.fb.group({
      tag: [null, [Validators.required]],
      address: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      mobile: [null, [Validators.required,Validators.maxLength(10)]],
    });
  }

  ngOnInit() {
    this.global.showLoader('Loading Data');
    this.getzipCode();
  }
  getzipCode(){
    this.authService.getZipCode().subscribe({
      next:(data:any)=>{
        this.userAddress=data.data;
         console.log(this.userAddress);
      },
      error:(err)=>{
         console.log(err);
      }
    })
    this.global.hideLoader();
  }
  addAddress() {
    if (
      this.mobile_FormControl.value.toString().length < 10 ||
      this.mobile_FormControl.value.toString().length > 10
    ) {
      this.toastService.presentToast('Please enter a valid no');
    }
    else{

    
    console.log(this.pincode_FormControl.value.postcode);
    let data = {
      tag: this.tag_FormControl.value,
      address: this.address_FormControl.value,
      zipcode: this.pincode_FormControl.value.postcode.trim(),
      suburb:this.pincode_FormControl.value.suburb,
      landmark: this.landmark_FormControl.value,
      mobile: '91'+this.mobile_FormControl.value,
    };
    console.log(data);
    this.authService.addAddress(data).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) {
          this.toastService.presentToast(data.message);
          this.addAddressForm.reset();
          this.router.navigate(['/manageaddress']);
        } else {
          this.toastService.presentToast('Error in User Details');
        }
      },
      error: (err) => {
        console.log(err)
        const {address, landmark, mobile, tag, zipcode} = err.error
        this.toastService.presentToast(tag || address || zipcode || landmark || mobile);
      },
    });
  }
  }

  // onChangeOfOptions(event){
  //   if(!event){
  //     this.items = this.origItems;
  // } // when nothing has typed*/   
  // if (typeof event === 'string') {
  //     console.log(event);
  //     this.userAddress = this.userAddress.filter(a => a.toLowerCase()
  //                                        .startsWith(event.toLowerCase())); 
  // }
  // console.log(this.userAddress.length);
 
  // }
  
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
