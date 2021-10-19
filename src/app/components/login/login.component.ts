import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private loginService: LoginService, private _snackBar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {
  }
  login() {
    this.loginService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this._snackBar.open('Logged in successfully', '', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
      this.router.navigate(['/countries']);
    });
  }
}
