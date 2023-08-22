import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { workflow_api_routes } from '../enums/auth.enum';
import { Filter } from '../shared/models/user.model';

@Injectable( {
  providedIn: 'root'
} )
export class WorkflowService {

  constructor ( private http: HttpClient ) { }

  getWorkflows ( requestParams: Filter ): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
      search: requestParams?.search
    };
    return this.http.get<any>( `${ workflow_api_routes.GET_WORKFLOW }?page=${ paramObj.page }&per_page=${ paramObj.per_page }&search=${ paramObj.search }&order_by=${ paramObj.order_by }&order_dir=${ paramObj.order_dir }  `, { } );
  }

  createWorkflow ( data: any ): Observable<any> {
    return this.http.post<any>( `${ workflow_api_routes.CREATE_WORKFLOW }`, data );
  }

  updateWorkflow ( data: any ): Observable<any> {
    return this.http.put<any>( `${ workflow_api_routes.UPDATE_WORKFLOW }`, data );
  }

  updateWorkflowStatus ( data: any ): Observable<any> {
    return this.http.put<any>( `${ workflow_api_routes.UPDATE_WORKFLOW_STATUS }`, data );
  }

  deleteWorkflow ( data: any ): Observable<any> {
    return this.http.delete<any>( `${ workflow_api_routes.DELETE_WORKFLOW }?Ids=${ data }` );
  }

}
