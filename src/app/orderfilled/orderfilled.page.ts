import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RatePage } from '../rate/rate.page';

@Component({
  selector: 'app-orderfilled',
  templateUrl: './orderfilled.page.html',
  styleUrls: ['./orderfilled.page.scss'],
})
export class OrderfilledPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  // var id = document.getElementById('modal');
  // id.style.display = 'flex';
  async presentAlert() {
    const modal = await this.modalController.create({
      component: RatePage,
      cssClass: 'dialog-modal',
    });
    return await modal.present();
  }
}
