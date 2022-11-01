import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  qrCodeString='This is a secret qr code message';
  // scannedResults:any;
  // content_visibility='hidden';
  zipped: boolean = true;
  isBarCodeVisible: boolean = false;
 
  constructor() { }

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
  
   
}
qrbtn(){
  this.zipped = !this.zipped;
  if(this.zipped){
    this.isBarCodeVisible = false
  }
  else{
    this.isBarCodeVisible = true;
  }
}




}