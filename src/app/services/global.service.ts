import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoading: boolean = false;
  constructor(private loadingCtrl: LoadingController) {}

  setLoader() {
    this.isLoading = !this.isLoading;
  }

  showLoader(msg?, spinner?) {
    // this.isLoading = true;
    if (!this.isLoading) this.setLoader();
    return this.loadingCtrl
      .create({
        message: msg,
        spinner: spinner ? spinner : 'bubbles',
      })
      .then((res) => {
        res.present().then(() => {
          if (!this.isLoading) {
            res.dismiss().then(() => {
              console.log('abort presenting');
            });
          }
        });
      })
      .catch((e) => {
        console.log('show loading error: ', e);
      });
  }

  hideLoader() {
    // this.isLoading = false;
    if (this.isLoading) this.setLoader();
    return this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'))
      .catch((e) => console.log('error hide loader: ', e));
  }
}
