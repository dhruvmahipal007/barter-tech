import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.serverUrl;
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(name: string, email: string, password: string, mobile: string) {}
  login(email: string, password: string) {
    let body = {
      email,
      password,
    };
    return this.http.post<any>(this.url + '/login', body);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
