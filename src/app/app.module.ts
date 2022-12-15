import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { Stripe, StripeOriginal } from '@ionic-native/Stripe'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { ConfigGuard } from './config.guard';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProductService } from './services/product.service';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';

import { PaymentOptionPage } from './cart/payment-option/payment-option.page';
import { CartPage } from './cart/cart.page';

// const stripe : any = StripeOriginal;

@NgModule({
  declarations: [AppComponent, PaymentOptionPage, CartPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    // stripe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuard,
    ProductService,
    Storage,
    NativeGeocoder,
    HTTP,
    ConfigGuard,
    File,
    FilePath,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
