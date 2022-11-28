import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.serverUrl;
  url2: string = 'http://barter-tech.antino.ca/api';
  addressSubject = new BehaviorSubject({});
  accountSubject = new BehaviorSubject({});
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
  forgetPassVerify(data) {
    return this.http.post<any>(this.url2 + '/resetPassword', data);
  }
  editProfile(data) {
    return this.http.post<any>(this.url2 + '/editprofile', data);
  }
  addAddress(data) {
    return this.http.post<any>(this.url2 + '/addaddress', data);
  }
  editAddress(data) {
    return this.http.post<any>(this.url2 + '/editAddress', data);
  }
  reservation(data) {
    return this.http.post<any>(this.url2 + '/TableReservation', data);
  }
  getAddress() {
    return this.http.get(this.url2 + '/getaddress');
  }
  mobileLoginVerify(data) {
    return this.http.post<any>(this.url2 + '/verifyOtp', data);
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
  getProfile() {
    return this.http.get(this.url2 + '/profile');
  }
  getVouchers() {
    const params = new HttpParams().append('merchant_id', '4');
    return this.http.get(this.url2 + '/getvouchers', { params });
  }
  getMyOrders() {
    return this.http.get(this.url2 + '/myOrders');
  }
  getOrderDetails(id) {
    return this.http.get(this.url2 + '/getOrderDetails', id);
  }
}
