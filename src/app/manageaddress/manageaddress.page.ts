import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-manageaddress',
  templateUrl: './manageaddress.page.html',
  styleUrls: ['./manageaddress.page.scss'],
})
export class ManageaddressPage implements OnInit {
  userAddress: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private global: GlobalService,
    private _route: ActivatedRoute,
    private alertCtrl:AlertController,
  ) {
    this._route.params.subscribe((res) => {
      // console.log(res);
      // console.log(this.router.url);
      this.getAdd();
    });
  }

  ngOnInit() {}
  getAdd() {
    this.global.showLoader('Loading Data');
    this.authService.getAddress().subscribe({
      next: (data: any) => {
        this.userAddress = data.data;
        this.global.hideLoader();
        console.log(this.userAddress);
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }

  editAddress(data) {
    this.authService.addressSubject.next(data);
    this.router.navigate(['/editaddress']);
  }
  async presentAlert() {
    const  alert = await this.alertCtrl.create({
       
        message: 'Are you sure you want to permanently delete this address?',
        buttons: [
            {
                text: 'No',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                role: 'confirm',
                handler: () => {
                   
                }
            }
        ]
    })
    await alert.present();
  }
}
