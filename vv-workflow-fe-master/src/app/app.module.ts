import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {AuthInterceptor} from './pages/interceptor/auth.interceptor';
import {SnackbarInterceptor} from './pages/interceptor/snackbar.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AppStoreModule} from './pages/store/store.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppStoreModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    MatSnackBarModule,
    NgxSpinnerModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
