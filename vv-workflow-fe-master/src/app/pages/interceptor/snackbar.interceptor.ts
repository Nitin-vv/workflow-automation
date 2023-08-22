
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((e:any) => {
        if(e?.body?.message !== undefined){
          if(e?.body?.statusCode == 200){
            this.snackBar.open(e?.body?.message, 'Ok', { duration: 2000, panelClass: ['success-snackbar'] ,verticalPosition: 'top'});
          } else{
            this.snackBar.open(e?.body?.message, 'Ok', { duration: 2000, panelClass: ['error-snackbar'] ,verticalPosition: 'top'});
          }
        }
      }),
      catchError(error => {
        this.snackBar.open('Error', 'Ok', { duration: 2000, panelClass: ['error-snackbar'] });
        return throwError(error);
      })
    );
  }
}
