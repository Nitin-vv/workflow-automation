import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { UpdateUser } from '../../shared/models/user.model';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './workflow.actions';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Get_Workflow, Create_Workflow, Update_Workflow, Delete_Workflow } from '../../shared/models/workflow.model';
import { PropertyService } from '../../services/property.service';
import { initialState } from './workflow.state';
import { WorkflowService } from '../../services/workflow.service';

/**
 * Authentication Effect
 * Effect connected with Auth Service and manage callbacks based on Auth api result
 * @type {Effect}
 */

@Injectable()
export class WorkflowEffects {

  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType( actions.GET_LIST ),
    map( action => ( action as actions.GetList ).payload ),
    switchMap( payload => {
      return from( this.workflowService.getWorkflows( payload ) ).pipe(
        map( result => {
          // this.store.dispatch( new actions.ClearDetail() );
          return new actions.GetListSuccess( result );
        } ),
        catchError( err => {
          return of();
        } )
      );
    } )
  );

  @Effect()
  createWorkflow$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_WORKFLOW ),
    map( action => ( action as actions.CreateWorkflow ).payload ),
    switchMap( ( payload: any ) => {
      const data: any = {
        title: payload.title,
        workflow: payload.workflows,
        status: payload.status
      }
      return from( this.workflowService.createWorkflow( data ) ).pipe(
        map( result => {
          if ( result ) {
            return new actions.CreateWorkflowSuccessful( result.data );
          }
        } ),
        catchError( error => of() )
      )
    } )
  );

  @Effect()
  createWorkflowSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.CREATE_WORKFLOW_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.CreateWorkflowSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateWorkflow$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_WORKFLOW ),
    map( action => ( action as actions.UpdateWorkflow ).payload ),
    switchMap( payload => {
      return from( this.workflowService.updateWorkflow( payload ) ).pipe(
        map( result => {
          return new actions.UpdateWorkflowSuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdateWorkflowFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  updateWorkflowSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_WORKFLOW_SUCCESFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.UpdateWorkflowSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  @Effect()
  updateWorkflowStatus$: Observable<Action> = this.actions$.pipe(
    ofType( actions.UPDATE_WORKFLOW_STATUS ),
    map( action => ( action as actions.UpdateWorkflowStatus ).payload ),
    switchMap( payload => {
      return from( this.workflowService.updateWorkflowStatus( payload ) ).pipe(
        map( result => {
          return new actions.UpdateWorkflowSuccessful( result.data );
        } ),
        catchError( error => of( new actions.UpdateWorkflowFailed( error.message ) ) )
      );
    } )
  );

  @Effect()
  deleteWorkflow$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_WORKFLOW ),
    map( action => ( action as actions.DeleteWorkflow ).payload ),
    switchMap( payload => {
      return from( this.workflowService.deleteWorkflow( payload ) ).pipe(
        map( result => {
          if ( result ) {
            return new actions.DeleteWorkflowSuccessful( result );
          }
        } ),
        catchError( error => of( new actions.DeleteWorkflowFailed( error.message ) ) )
      )
    } )
  );

  @Effect()
  deleteWorkflowSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType( actions.DELETE_WORKFLOW_SUCCESSFUL ),
    debounceTime( 300 ),
    map( action => ( action as actions.DeleteWorkflowSuccessful ).payload ),
    switchMap( ( payload: any ) => {
      return of()
    } )
  );

  constructor (
    private actions$: Actions,
    private store: Store<AppState>,
    private workflowService: WorkflowService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
}
