import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {auth_api_routes} from '../enums/auth.enum';
import {UpdateUser} from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${auth_api_routes.SIGNUP}`, data, {});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${auth_api_routes.LOGIN}`, {
      email,
      password,
    });
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${auth_api_routes.USER_INFO}`, { });
  }

  logout(): Observable<any> {
    return this.http.get(`${auth_api_routes.LOGOUT}`, { });
  }

  clearStore() {
    // this.store$.dispatch(new authClearDetail());
  }

  updateUserInfo(payload: UpdateUser): Observable<any> {
    return this.http.put<any>(`${auth_api_routes.UPDATE_USER}`, payload );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${auth_api_routes.FORGOT_PASSWORD}`, {
      email,
    });
  }

  resetPassword(data:any): Observable<any> {
    return this.http.post<any>(`${auth_api_routes.RESET_PASSWORD}`,data );
  }

}
