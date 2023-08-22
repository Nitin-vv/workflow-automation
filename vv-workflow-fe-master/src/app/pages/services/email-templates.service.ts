import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { email_templates_api_routes } from '../enums/auth.enum';
import { Filter } from '../shared/models/user.model';

@Injectable( {
  providedIn: 'root'
} )
export class EmailTemplatesService {

  constructor ( private http: HttpClient ) { }

  getEmailTemplates ( requestParams: Filter ): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
      search: requestParams?.search
    };
    return this.http.get<any>( `${ email_templates_api_routes.GET_EMAIL_TEMPLATE }?page=${ paramObj.page }&per_page=${ paramObj.per_page }&search=${ paramObj.search }&order_by=${ paramObj.order_by }&order_dir=${ paramObj.order_dir } `, { } );
  }

  createEmailTemplates ( data: any ): Observable<any> {
    return this.http.post<any>( `${ email_templates_api_routes.CREATE_EMAIL_TEMPLATE }`, data );
  }

  updateEmailTemplates ( data: any ): Observable<any> {
    return this.http.put<any>( `${ email_templates_api_routes.UPDATE_EMAIL_TEMPLATE }`, data );
  }

  updateEmailTemplatesStatus ( data: any ): Observable<any> {
    return this.http.put<any>( `${ email_templates_api_routes.UPDATE_EMAIL_TEMPLATE_STATUS }`, data );
  }

  deleteEmailTemplates ( data: any ): Observable<any> {
    return this.http.delete<any>( `${ email_templates_api_routes.DELETE_EMAIL_TEMPLATE }?Ids=${ data }` );
  }

}
