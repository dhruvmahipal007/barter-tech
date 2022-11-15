import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.serverUrl;
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(data): Observable<any> {
    return this.http.post<any>(this.url + '/register', data);
  }
  login(data) {
    return this.http.post<any>(this.url + '/login', data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  loggedIn() {
    // return !!localStorage.getItem('token');
    return !!this.getToken();
  }
}
