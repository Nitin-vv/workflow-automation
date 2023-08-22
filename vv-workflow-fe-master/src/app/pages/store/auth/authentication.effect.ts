import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';


// import { AUTH } from 'app/core/errors';
import { UpdateUser } from '../../shared/models/user.model';
// import { AuthService } from 'app/shared/services/auth/auth.service';
// import { LocalStorageService } from 'app/shared/services/local-storage.service';
// import { AddError } from '../error/error.actions';
// import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './authentication.action';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/localstorage.service';

/**
 * Authentication Effect
 * Effect connected with Auth Service and manage callbacks based on Auth api result
 * @type {Effect}
 */

@Injectable()
export class AuthenticationEffects {
  /**
   * Handle login api
   * @type {Observable}
   */

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGIN),
    map(action => (action as actions.Login).payload),
    switchMap((payload: actions.LoginPayload) => {
      return from(this.authService.login(payload.email, payload.password)).pipe(
        map(result => {
          // this.localStorageService.storeAuthorization(
          //   `${result.token}`
          // );
          if(result){
            return new actions.LoginSuccessful(result);
          }
        }),
        catchError(error => of(new actions.LoginFailed(error.message)))
      )
    })
  );

  /**
   * Handle login successful
   * @type {Observable}
   */

  @Effect()
  loginSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGIN_SUCCESFUL),
    debounceTime(300),
    map(action => (action as actions.LoginSuccessful).payload),
    switchMap((payload: any) => {
      let token = this.localStorageService.storeAuthorization(
        `Bearer ${payload.token}`
      );
      // this.router.navigateByUrl('/')
      // this.store.dispatch(new routerActions.Go({ path: ['/'] }));
      // return of()
      return of(new actions.GetUserInfo());
    })
  );

  /**
   * Handle user info api
   * @type {Observable}
   */

  @Effect()
  getUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_USER_INFO),
    map(action => (action as actions.Login).payload),
    switchMap((payload: actions.LoginPayload) => {
      return from(this.authService.getUserInfo()).pipe(
        map(result => {
          return new actions.GetUserInfoSuccessful(result);
        }),
        catchError(error => {
          return of(new actions.GetUserInfoFailed(error.message));
        })
      );
    })
  );

  /**
   * Handle user info api
   * @type {Observable}
   */

  @Effect()
  getUserInfoSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_USER_INFO_SUCCESSFUL),
    map(action => (action as actions.Login).payload),
    switchMap((payload: any) => {
      if(payload.data){
        this.router.navigateByUrl('')
        return of()
      }else {
        this.router.navigateByUrl('/login')
        return of()
      }
    })
  );

  /**
   * Handle user info failed
   * @type {Observable}
   */

  @Effect()
  getUserInfoFailed$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_USER_INFO_FAILED),
    switchMap(() => {
      this.router.navigateByUrl('/login')
      return of ()
      // return of(new routerActions.Go({ path: ['/login'] }));
    })
  );

  /**
   * Handle update user info api
   * @type {Observable}
   */

  @Effect()
  updateUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UPDATE_USER_INFO),
    map(action => (action as actions.UpdateUserInfo).payload),
    switchMap((payload: UpdateUser) => {
      return from(this.authService.updateUserInfo(payload)).pipe(
        map(result => {
          return new actions.UpdateUserInfoSuccessful(result.data);
        }),
        catchError(error => {
          let errorMessage = error;
          if (error['status'] === 422) {
            errorMessage = error['error']['message'];
          }
          // this.store$.dispatch(
          //   new AddError({
          //     type: error,
          //     message: errorMessage,
          //   })
          // );
          return of(new actions.UpdateUserInfoFailed(error.message));
        })
      );
    })
  );

  /**
   * Handle logout api
   * @type {Observable}
   */

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGOUT),
    switchMap(() => {
      return from(this.authService.logout()).pipe(
        map(() => {
          return new actions.LogoutSuccessful();
        }),
        catchError(error => {
          return of(new actions.LogoutSuccessful());
        })
      );
    })
  );

  /**
   * Handle logout success
   * @type {Observable}
   */

  @Effect()
  logoutSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGOUT_SUCCESSFUL),
    switchMap(() => {
      this.localStorageService.clear();
      this.authService.clearStore();
      return of(new routerActions.Go({ path: ['sessions/signin'] }));
    })
  );
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store$: Store<AppState>,
    // private permissionsService: NgxPermissionsService,
    // private rolesService: NgxRolesService,
    private router: Router
  ) {}
}
