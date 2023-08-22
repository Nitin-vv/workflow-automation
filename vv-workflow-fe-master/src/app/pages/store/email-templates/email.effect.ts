import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UpdateUser } from '../../shared/models/user.model';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './email.actions';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Get_Property, Create_Property, Update_Property, Delete_Property } from '../../shared/models/property.model';
import { PropertyService } from '../../services/property.service';
import { initialState } from './email.state';
// import { SmsTemplatesService } from '../../services/sms-templates.service';
import { Create_Email, Delete_Email, EmailResponse, Update_Email, Update_Email_Status, Filter } from '../../shared/models/email.model';
import { EmailTemplatesService } from '../../services/email-templates.service';


/**
 * Authentication Effect
 * Effect connected with Auth Service and manage callbacks based on Auth api result
 * @type {Effect}
 */

@Injectable()
export class EmailEffects {


  @Effect()
  getEmailList$: Observable<Action> = this.actions$.pipe(
    ofType( actions.GET_EMAIL_LIST ),
    map( action => ( action as actions.GetEmailList ).payload ),
    switchMap( payload => {
      return from( this.emailService.getEmailTemplates( payload ) ).pipe(
        map( result => {
          // this.store.dispatch( new actions.ClearDetail() );
          return new actions.GetEmailListSuccess( result );
        } ),
        catchError( err => {
          return of(
            // new actions.AddError( {
            //   error: "Failed",
            // } )
          );
        } )
      );
    } )
  );

  @Effect()
  createEmail$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_EMAIL ),
    map( action => ( action as actions.CreateEmail ).payload ),
    switchMap( ( payload: Create_Email ) => {
      const data: Create_Email = {
        title: payload.title,
        subject: payload.subject,
        body: payload.body,
        status: payload.status,
      }
      return from( this.emailService.createEmailTemplates( data ) ).pipe(
        map( result => {
          // if ( result ) {
          //   const payload = {
          //     page: 1,
          //     limit: 20
          //   }
          // this.store.dispatch( new actions.GetList( payload ) );
          return new actions.CreateEmailSuccessful( result.data );
          // }
        } ),
        catchError( error => of() )
      )
    } )
  );


  @Effect()
  createEmailSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_EMAIL_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.CreateEmailSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateEmail$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_EMAIL ),
    map( action => ( action as actions.UpdateEmail ).payload ),
    switchMap( payload => {
      return from( this.emailService.updateEmailTemplates( payload ) ).pipe(
        map( result => {
          return new actions.UpdateEmailSuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdateEmailFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  updateEmailSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_EMAIL_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.UpdateEmailSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateStatus$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_STATUS ),
    map( action => ( action as actions.UpdateStatus ).payload ),
    switchMap( payload => {
      return from( this.emailService.updateEmailTemplatesStatus( payload ) ).pipe(
        map( result => {
          return new actions.UpdateStatusSuccessful( result.data );
        } ),
        catchError( error => of() )
      );
    } )
  );

  @Effect()
  deleteEmail$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_EMAIL ),
    map( action => ( action as actions.DeleteEmail ).payload ),
    switchMap( payload => {
      return from( this.emailService.deleteEmailTemplates( payload ) ).pipe(
        map( result => {
          if ( result ) {
            return new actions.DeleteEmailSuccessful( result );
          }
        } ),
        catchError( error => of( new actions.DeleteEmailFailed( error.message ) ) )
      )
    } )
  );

  @Effect()
  deleteEmailSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_EMAIL_SUCCESSFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.DeleteEmailSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  constructor (
    private actions$: Actions,
    private store: Store<AppState>,
    private propertyService: PropertyService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private emailService: EmailTemplatesService
  ) { }
}
