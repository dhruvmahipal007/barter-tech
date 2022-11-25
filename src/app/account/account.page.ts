import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  qrCodeString = 'This is a secret qr code message';
  // scannedResults:any;
  // content_visibility='hidden';
  zipped: boolean = true;
  isBarCodeVisible: boolean = false;
  userData: any;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastService: ToastService,
    private global: GlobalService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((res) => {
      // console.log(res);
      // console.log(this.router.url);
      this.getData();
    });
  }

  // async checkPermission(){
  //   try{
  //     //check or request permission
  //     const status=await BarcodeScanner.checkPermission({force:true});
  //     if(status.granted){
  //       //the user granted permission
  //       return true;
  //     }
  //     return false;

  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  // async startScan(){
  //   try{
  //     const permission=await this.checkPermission();
  //     if(!permission){
  //       return;
  //     }
  //     await BarcodeScanner.hideBackground();
  //     document.querySelector('body').classList.add('scanner-active');
  //     this.content_visibility='hidden';
  //     const result=await BarcodeScanner.startScan();
  //     console.log(result);
  //     BarcodeScanner.showBackground();
  //     document.querySelector('body').classList.remove('scanner-active');
  //     this.content_visibility='';
  //     if(result?.hasContent){
  //       this.scannedResults=result.content;
  //       console.log(this.scannedResults)
  //     }
  //   }catch(e){
  //     console.log(e);
  //     this.stopScan();
  //   }
  // }

  // stopScan(){
  //   BarcodeScanner.showBackground();
  //   BarcodeScanner.stopScan();
  //   document.querySelector('body').classList.remove('scanner-active');
  //   this.content_visibility='';
  // }

  //  ngOnDestroy(): void {
  //    this.stopScan();
  //  }

  ngOnInit(): void {
    // this.getData();
  }
  qrbtn() {
    this.zipped = !this.zipped;
    if (this.zipped) {
      this.isBarCodeVisible = false;
    } else {
      this.isBarCodeVisible = true;
    }
  }
  async openWhatson() {
    await Browser.open({
      url: 'https://thestirlingarms.com.au/whats-on/stirling-specials',
    });
  }
  async openAboutUs() {
    await Browser.open({
      url: 'https://thestirlingarms.com.au/about-us/about-us',
    });
  }
  async openLegal() {
    await Browser.open({
      url: 'https://thestirlingarms.com.au/stay/terms-conditions',
    });
  }

  logout() {
    this.global.showLoader().then(() => {
      this.authService
        .logout()
        .then(() => {
          this.navCtrl.navigateRoot('/login');
          this.global.hideLoader();
        })
        .catch((e) => {
          this.global.hideLoader();
          this.toastService.presentToast(
            'Logout Failed!Check Your Internet Connection'
          );
        });
    });
  }

  getData() {
    this.global.showLoader('Loading Data');
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        this.userData = data.data;
        this.global.hideLoader();
        console.log(this.userData);
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }
  editProfile(userData) {
    this.authService.accountSubject.next(this.userData);
    this.router.navigate(['/profile']);
  }
}
