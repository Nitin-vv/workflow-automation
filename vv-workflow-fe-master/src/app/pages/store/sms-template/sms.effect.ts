import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UpdateUser } from '../../shared/models/user.model';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './sms.actions';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Get_Property, Create_Property, Update_Property, Delete_Property } from '../../shared/models/property.model';
import { PropertyService } from '../../services/property.service';
import { initialState } from './sms.state';
import { SmsTemplatesService } from '../../services/sms-templates.service';
import { Create_Sms } from '../../shared/models/sms.model';

/**
 * Authentication Effect
 * Effect connected with Auth Service and manage callbacks based on Auth api result
 * @type {Effect}
 */

@Injectable()
export class SmsEffects {


  @Effect()
  getSmsList$: Observable<Action> = this.actions$.pipe(
    ofType( actions.GET_SMS_LIST ),
    map( action => ( action as actions.GetSmsList ).payload ),
    switchMap( payload => {
      return from( this.smsService.getSmsTemplates( payload ) ).pipe(
        map( result => {
          // this.store.dispatch( new actions.ClearDetail() );
          return new actions.GetSmsListSuccess( result );
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
  createSms$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_SMS ),
    map( action => ( action as actions.CreateSms ).payload ),
    switchMap( ( payload: Create_Sms ) => {
      const data: Create_Sms = {
        title: payload.title,
        template: payload.template,
        status: payload.status,
      }
      return from( this.smsService.createSmsTemplates( data ) ).pipe(
        map( result => {
          // if ( result ) {
          //   const payload = {
          //     page: 1,
          //     limit: 20
          //   }
          // this.store.dispatch( new actions.GetList( payload ) );
          return new actions.CreateSmsSuccessful( result.data );
          // }
        } ),
        catchError( error => of() )
      )
    } )
  );


  @Effect()
  createSmsSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_SMS_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.CreateSmsSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateSms$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_SMS ),
    map( action => ( action as actions.UpdateSms ).payload ),
    switchMap( payload => {
      return from( this.smsService.updateSmsTemplates( payload ) ).pipe(
        map( result => {
          return new actions.UpdateSmsSuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdateSmsFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  updateSmsSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_SMS_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.UpdateSmsSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateStatus$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_STATUS ),
    map( action => ( action as actions.UpdateStatus ).payload ),
    switchMap( payload => {
      return from( this.smsService.updateSmsTemplatesStatus( payload ) ).pipe(
        map( result => {
          return new actions.UpdateStatusSuccessful( result.data );
        } ),
        catchError( error => of() )
      );
    } )
  );

  @Effect()
  deleteSms$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_SMS ),
    map( action => ( action as actions.DeleteSms ).payload ),
    switchMap( payload => {
      return from( this.smsService.deleteSmsTemplates( payload ) ).pipe(
        map( result => {
          if ( result ) {
            return new actions.DeleteSmsSuccessful( result );
          }
        } ),
        catchError( error => of( new actions.DeleteSmsFailed( error.message ) ) )
      )
    } )
  );

  @Effect()
  deleteSmsSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_SMS_SUCCESSFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.DeleteSmsSuccessful ).payload ),
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
    private smsService: SmsTemplatesService
  ) { }
}
