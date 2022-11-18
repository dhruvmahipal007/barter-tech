import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private auth_service: AuthService,
    private router: Router
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
    return next.handle(tokenizedReq);
  }
}
