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
  url2: string = 'http://barter-tech.antino.ca/api';
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {}

  registerUser(data): Observable<any> {
    return this.http.post<any>(this.url2 + '/register', data);
  }
  login(data) {
    return this.http.post<any>(this.url2 + '/login', data);
  }
  forgetPass(email: string) {
    let body = { email };
    return this.http.post<any>(this.url2 + '/forgotPassword', body);
  }
  getToken() {
    return localStorage.getItem('token');
    // return this.storage.get('token');
  }
  contactUs(data) {
    return this.http.post<any>(this.url2 + '/contactUs', data);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
    // return !!this.getToken();
  }
  forgetPassVerify(otp: string, newPassword: string) {
    let body = {
      uniqueCode: otp,
      new_password: newPassword,
    };
    return this.http.post<any>(this.url2 + '/resetPassword', body);
  }
  editProfile(data) {
    return this.http.post<any>(this.url2 + '/editprofile', data);
  }
  addAddress(data) {
    return this.http.post<any>(this.url2 + '/addaddress', data);
  }
  reservation(data) {
    return this.http.post<any>(this.url2 + '/TableReservation', data);
  }
  async logout() {
    try {
      // await this.storage.clear();
      await localStorage.clear();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
