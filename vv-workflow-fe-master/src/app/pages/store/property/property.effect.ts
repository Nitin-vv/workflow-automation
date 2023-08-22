import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UpdateUser } from '../../shared/models/user.model';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './property.actions';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Get_Property, Create_Property, Update_Property, Delete_Property } from '../../shared/models/property.model';
import { PropertyService } from '../../services/property.service';
import { initialState } from './property.state';

/**
 * Authentication Effect
 * Effect connected with Auth Service and manage callbacks based on Auth api result
 * @type {Effect}
 */

@Injectable()
export class PropertyEffects {

  // @Effect()
  // getProperty$: Observable<Action> = this.actions$.pipe(
  //   ofType( actions.GET_PROPERTY ),
  //   map( action => ( action as actions.GetProperty ).payload ),
  //   switchMap( ( payload: any ) => {
  //     return from( this.propertyService.getProperty( payload ) ).pipe(
  //       map( result => {
  //         if ( result ) {
  //           return new actions.GetPropertySuccessful( result );
  //         }
  //       } ),
  //       catchError( error => of( new actions.GetPropertyFailed( error.message ) ) )
  //     )
  //   } )
  // );

  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType( actions.GET_LIST ),
    map( action => ( action as actions.GetList ).payload ),
    switchMap( payload => {
      return from( this.propertyService.getProperty( payload ) ).pipe(
        map( result => {
          // this.store.dispatch( new actions.ClearDetail() );
          return new actions.GetListSuccess( result );
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


  // @Effect()
  // getPropertySuccessful$: Observable<Action> = this.actions$.pipe(
  //   ofType( actions.GET_PROPERTY_SUCCESSFUL ),
  //   debounceTime( 300 ),
  //   map( action => ( action as actions.GetPropertySuccessful ).payload ),
  //   switchMap( ( payload: any ) => {
  //     return of()
  //   } )
  // );

  @Effect()
  createProperty$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_PROPERTY ),
    map( action => ( action as actions.CreateProperty ).payload ),
    switchMap( ( payload: Create_Property ) => {
      const data: Create_Property = {
        title: payload.title,
        type: payload.type,
        regex: payload.regex,
        status: payload.status
      }
      return from( this.propertyService.createProperty( data ) ).pipe(
        map( result => {
          if ( result ) {
            const payload = {
              page: 1,
              limit: 20
            }
            // this.store.dispatch( new actions.GetList( payload ) );
            return new actions.CreatePropertySuccessful( result.data );
          }
        } ),
        catchError( error => of() )
      )
    } )
  );

  @Effect()
  createPropertySuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_PROPERTY_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.CreatePropertySuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateProperty$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_PROPERTY ),
    map( action => ( action as actions.UpdateProperty ).payload ),
    switchMap( payload => {
      return from( this.propertyService.updateProperty( payload ) ).pipe(
        map( result => {
          return new actions.UpdatePropertySuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdatePropertyFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  updatePropertySuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_PROPERTY_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.UpdatePropertySuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateStatus$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_PROPERTY_STATUS ),
    map( action => ( action as actions.UpdatePropertyStatus ).payload ),
    switchMap( payload => {
      return from( this.propertyService.updatePropertyStatus( payload ) ).pipe(
        map( result => {
          return new actions.UpdatePropertySuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdatePropertyFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  deleteProperty$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_PROPERTY ),
    map( action => ( action as actions.DeleteProperty ).payload ),
    switchMap( payload => {
      return from( this.propertyService.deleteProperty( payload ) ).pipe(
        map( result => {
          if ( result ) {
            const payload = {
              page: 1,
              per_page: 20
            }
            // this.store.dispatch( new actions.GetProperty( payload ) );
            return new actions.DeletePropertySuccessful( result );
          }
        } ),
        catchError( error => of( new actions.DeletePropertyFailed( error.message ) ) )
      )
    } )
  );

  @Effect()
  deletePropertySuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_PROPERTY_SUCCESSFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.DeletePropertySuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  constructor (
    private actions$: Actions,
    private store: Store<AppState>,
    private propertyService: PropertyService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
}
