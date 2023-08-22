import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private spinnerSer: NgxSpinnerService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerSer.show(undefined, {
      type: 'square-jelly-box',
      size: 'medium',
    });

    const isSignupRequest = request.url.endsWith('/signup');
    const isLoginRequest = request.url.endsWith('/login');

    if (!isSignupRequest && !isLoginRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `${localStorage.getItem('authorization')}`
        }
      });
    }

    return next.handle(request).pipe(
      tap((event: any) => {
        if (event.body == undefined) {
          return next.handle(request);
        } else if (event.body.status == 401) {
          this.snackbar.open(event.body.message, 'Cancel', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          localStorage.clear();
          localStorage.setItem('reload', 'true');
          this.router.navigateByUrl('/login');
        }
      }),
      finalize(() => {
        this.spinnerSer.hide();
      })
    );
  }
}
