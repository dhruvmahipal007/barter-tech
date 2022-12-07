import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, throwError } from 'rxjs';
import { NavController } from '@ionic/angular';
import { retry, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private auth_service: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) {}
  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let token = authService.getToken();
    let tokenizedReq = '';
    if (token) {
      tokenizedReq = req.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      tokenizedReq = req.clone({
        // setHeaders: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
    }
    return next.handle(tokenizedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.body.status === 'Token is Expired') {
            console.log('RESPONSE ERROR');
            alert('Session is logged out, Please Login');
            authService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        }
      })
    );
  }
}
