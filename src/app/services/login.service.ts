import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/auth-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  login(body: AuthRequest) {
    return this.http.post('login', body);
  }
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
