import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import {SignInWithApple, SignInWithAppleOptions, SignInWithAppleResponse} from '@capacitor-community/apple-sign-in'
@Component({
  selector: 'app-signinapple',
  templateUrl: './signinapple.page.html',
  styleUrls: ['./signinapple.page.scss'],
})
export class SigninapplePage implements OnInit {
  AppleLoginForm: FormGroup;
  userData:any;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private storage: StorageService,
    private http: HttpClient,
    private _route: ActivatedRoute,
    private alertController: AlertController) {
      this.AppleLoginForm = this.fb.group({
        name: [
          null,
          [Validators.required,],
        ],
      });
    }

  ngOnInit() {
  }
  loginwithapple(){
    // const firebaseConfig = {
    //   apiKey: "AIzaSyCHZgwYrB8VAgwGe4C7DkRT0P8yGDXUIPk",
    //   authDomain: "barter-tech.firebaseapp.com",
    //   projectId: "barter-tech",
    //   storageBucket: "barter-tech.appspot.com",
    //   messagingSenderId: "737194284758",
    //   appId: "1:737194284758:web:41f0e720a9da6cd7ef5b77",
    //   measurementId: "G-CDJZC6XDGS"
    // };
    this.signInWithAppleNative();
    
  }
  signInWithAppleNative(){
    let options:SignInWithAppleOptions={
      clientId: 'com.bartertech.app ',
      redirectURI: 'https://barter-tech.firebaseapp.com/__/auth/handler',
      scopes:'email',
      state:'12345'
    };
    SignInWithApple.authorize(options).then((result:SignInWithAppleResponse)=>{
      console.log('RESULT: ',result);
      if (result.response && result.response.identityToken) {
        this.userData = result.response;
        const obj = {
          token: this.userData.identityToken,
          name: this.name_FormControl.value,
        };
        console.log(obj);
    this.authService.appleLogin(obj).subscribe({
      next: (data:any) => {
        console.log(data);
        if (data.status) {
          localStorage.setItem(
            'token',
            data.data.userToken.original.access_token
          );
          localStorage.setItem(
            'userDetails',
            JSON.stringify(data.data.UserData)
          );
          // this.storage.store('userDetails', data.data.UserData);
          this.toastService.presentToast(data.message);
          this.router.navigate(['/account']);
        } else {
          this.toastService.presentToast('something went wrong');
        }
      },
      error: (err) => {
        this.toastService.presentToast(err);
        console.log(err.statusText);
      },
    });

      } else {
        this.presentAlert();
      }
    }).catch((response)=>{
      this.presentAlert();
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Please try again later',
      buttons: ['OK'],
    });
    await alert.present();
  }
  get name_FormControl(): FormControl | null {
    return (this.AppleLoginForm?.get('name') as FormControl) ?? null;
  }
}

