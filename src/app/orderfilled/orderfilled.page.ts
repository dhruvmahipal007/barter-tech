import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RatePage } from '../rate/rate.page';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-orderfilled',
  templateUrl: './orderfilled.page.html',
  styleUrls: ['./orderfilled.page.scss'],
})
export class OrderfilledPage implements OnInit {
  id: string = '';
  userOrderDetails: any;
  constructor(
    private modalController: ModalController,
    private readonly _activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private global: GlobalService,
    private toastService: ToastService
  ) {
    this._activatedRoute.params.subscribe((res) => {
      // console.log(res);
      // console.log(this.router.url);
    });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      this.getOrderedData();
    });
  }
  // var id = document.getElementById('modal');
  // id.style.display = 'flex';
  async presentAlert() {
    const modal = await this.modalController.create({
      component: RatePage,
      cssClass: 'dialog-modal',
    });
    return await modal.present();
  }

  getOrderedData() {
    this.global.showLoader('Loading Data');
    this.authService.getOrderDetails(this.id).subscribe({
      next: (data: any) => {
        if (data.status) {
          this.userOrderDetails = data.data.order_details;
          this.global.hideLoader();
          console.log(this.userOrderDetails);
        } else {
          this.global.hideLoader();
        }
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }
}
