import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  baseUrl = 'https://taskfrontendapi.azurewebsites.net/api/';

  constructor(private _snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.baseUrl + request.url
    });
    if (localStorage.getItem('token')) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open(error.error?.title, '', { duration: 3000, panelClass: 'error-snackbar' });
        return throwError(error.error?.error);
      })
    );
  }
}
