import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'task';
  isLoggedIn = false;
  constructor(private router: Router,public loginService: LoginService) {}
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
