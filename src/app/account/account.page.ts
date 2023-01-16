import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { ProfilephotooptionComponent } from '../components/profilephotooption/profilephotooption.component';
import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  qrCodeString = '';
  // scannedResults:any;
  // content_visibility='hidden';
  zipped: boolean = false;
  isBarCodeVisible: boolean = true;
  userData: any;
  isLoading: boolean;
  cartItemsLength:any=0;
  finalVariable:any="assets/account.svg";
  temporaryVariable:any="assets/account.svg";
urldata:any;
whatson:any;
aboutus:any;
legal:any;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastService: ToastService,
    private global: GlobalService,
    private router: Router,
    private _route: ActivatedRoute,
    private platform: Platform,
    private location: Location,
    private modalController: ModalController,
    private imagePicker:ImagePicker,
    private webview:WebView,
    
  ) {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(99999, () => {
        var url = this.router['routerState'].snapshot.url;
        console.log(url);
        if (url == '/account') {
          if (window.confirm('Do you want to exit?')) {
            App.exitApp();
          }
        }
        // this.location.back();
      });
    });
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
    this.getURL();
    this.authService.badgeDataSubject.subscribe(res=>{
      console.log(res,"heelo");
      console.log(Object.keys(res),"byee");
      if(res==0){
       
       let data=JSON.parse(localStorage.getItem('cartItems'));
       this.cartItemsLength=data?data.length:0
       
      }
      else{
       this.cartItemsLength=res;
      }
   
     })
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
      // url: 'https://thestirlingarms.com.au/whats-on/stirling-specials',
      url:this.whatson,
    });
  }
  async openAboutUs() {
    await Browser.open({
      // url: 'https://thestirlingarms.com.au/about-us/about-us',
      url:this.aboutus,
    });
  }
  async openLegal() {
    await Browser.open({
      // url: 'https://thestirlingarms.com.au/stay/terms-conditions',
      url:this.legal,
    });
  }

  logout() {
    this.global.showLoader().then(() => {
      this.authService
        .logout()
        .then(() => {
          this.navCtrl.navigateRoot('/login');
          this.global.hideLoader();
          this.authService.couponSubject.next({});
        })
        .catch((e) => {
          this.global.hideLoader();
          this.toastService.presentToast(
            'Logout Failed!Check Your Internet Connection'
          );
        });
    });
  }

  getURL(){
    this.authService.getUrl().subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.urldata=data.data
        console.log(this.urldata);
        this.whatson=this.urldata[0].whatson;
        this.aboutus=this.urldata[0].about;
        this.legal=this.urldata[0].ltc;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getData() {
    this.global.showLoader('Loading Data');
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        console.log(data);
        this.userData = data.data;
        this.finalVariable=data.data.imageUrl;
        if(this.finalVariable===null){
          this.finalVariable=this.temporaryVariable
        }
        console.log(this.finalVariable);
        this.global.hideLoader();
        console.log(this.userData);
        localStorage.setItem('userNo', JSON.stringify(this.userData.mobileNo));
        this.qrCodeString = 'M'+(this.userData.mobileNo.split('').splice(2,12).toString().replaceAll(',',''));
      },
      error: (err) => {
        this.global.hideLoader();
        this.toastService.presentToast(err);
      },
    });
  }
  editProfile(userData) {
    this.userData.mobileNo = (this.userData.mobileNo.split('').splice(2,12).toString().replaceAll(',',''));
    console.log(this.userData.mobileNo);
    this.authService.accountSubject.next(this.userData);
    this.router.navigate(['/profile']);
  }
  openImagePicker(){
    this.imagePicker.hasReadPermission().then(res=>{
      console.log('permission status = ',res);
      if(res ==false){
        this.imagePicker.requestReadPermission().then(res1=>{
          console.log('requested permission status =',res1);
        })
      }
      else{
        let options:ImagePickerOptions={
          maximumImagesCount:1
        }
        this.imagePicker.getPictures(options).then(result=>{
          console.log('selected photos =',result[0])

          if(result!=null){
            // this.finalVariable=Capacitor.convertFileSrc(result);
            // console.log(this.finalVariable);
           this.finalVariable=this.webview.convertFileSrc(result[0]);
           let obj={
            imageurl:this.finalVariable
           }
           this.authService.setProfilePhoto(obj).subscribe({
            next:(data)=>{
             console.log(data);
            },
            error:(err)=>{
             console.log(err);
            }
           })
           localStorage.setItem('finalVariable',JSON.stringify(this.finalVariable));
          console.log(this.finalVariable);
          }
          else{
            console.log('result is empty');
          }
        })
      }
    })

  }
}
