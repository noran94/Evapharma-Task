import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  baseUrl = 'https://reqres.in/api/';

  constructor(private _snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.baseUrl + request.url
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open(error.error?.error, '', { duration: 3000, panelClass: 'error-snackbar' });
        return throwError(error.error?.error);
      })
    );
  }
}
