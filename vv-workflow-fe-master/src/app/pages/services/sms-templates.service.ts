import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { property_api_routes, sms_templates_api_routes } from '../enums/auth.enum';
import { Filter } from '../shared/models/user.model';

@Injectable( {
  providedIn: 'root'
} )
export class SmsTemplatesService {

  constructor ( private http: HttpClient ) { }

  getSmsTemplates ( requestParams: Filter ): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
      search: requestParams?.search
    };
    return this.http.get<any>( `${ sms_templates_api_routes.GET_SMS_TEMPLATE }?page=${ paramObj.page }&per_page=${ paramObj.per_page }&search=${ paramObj.search }&order_by=${ paramObj.order_by }&order_dir=${ paramObj.order_dir }  `, { } );
  }

  createSmsTemplates ( data: any ): Observable<any> {
    return this.http.post<any>( `${ sms_templates_api_routes.CREATE_SMS_TEMPLATE }`, data );
  }

  updateSmsTemplates ( data: any ): Observable<any> {
    return this.http.put<any>( `${ sms_templates_api_routes.UPDATE_SMS_TEMPLATE }`, data );
  }

  updateSmsTemplatesStatus ( data: any ): Observable<any> {
    return this.http.put<any>( `${ sms_templates_api_routes.UPDATE_SMS_TEMPLATE_STATUS }`, data );
  }

  deleteSmsTemplates ( data: any ): Observable<any> {
    return this.http.delete<any>( `${ sms_templates_api_routes.DELETE_SMS_TEMPLATE }?Ids=${ data }` );
  }

}
