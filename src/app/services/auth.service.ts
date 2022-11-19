import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.serverUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {}

  registerUser(data): Observable<any> {
    return this.http.post<any>(this.url + '/register', data);
  }
  login(data) {
    return this.http.post<any>(this.url + '/login', data);
  }
  forgetPass(email: string) {
    let body = { email };
    return this.http.post<any>(this.url + '/forgotPassword', body);
  }
  getToken() {
    // return localStorage.getItem('token');
    return this.storage.get('token');
  }
  loggedIn() {
    // return !!localStorage.getItem('token');
    return !!this.getToken();
  }
  forgetPassVerify(otp: string, newPassword: string) {
    let body = {
      uniqueCode: otp,
      new_password: newPassword,
    };
    return this.http.post<any>(this.url + `resetPassword`, body);
  }
  async logout() {
    try {
      await this.storage.clear();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
