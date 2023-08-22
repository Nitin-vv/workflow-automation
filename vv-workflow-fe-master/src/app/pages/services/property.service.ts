import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth_api_routes, property_api_routes } from '../enums/auth.enum';
import { UpdateUser } from '../shared/models/user.model';
import { Get_Property, Create_Property, Update_Property, Delete_Property, Update_Property_Status } from '../shared/models/property.model';
import { Filter } from '../shared/models/shared.model';


@Injectable( {
  providedIn: 'root'
} )
export class PropertyService {

  constructor ( private http: HttpClient ) { }

  getProperty ( requestParams: Filter ): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
      search: requestParams?.search
    };
    return this.http.get<any>( `${ property_api_routes.GET_PROPERTY }?page=${ paramObj.page }&per_page=${ paramObj.per_page }&search=${ paramObj.search }&order_by=${ paramObj.order_by }&order_dir=${ paramObj.order_dir } `, {} );
  }

  createProperty ( data: Create_Property ): Observable<any> {
    return this.http.post<Create_Property>( `${ property_api_routes.CREATE_PROPERTY }`, data );
  }

  updateProperty ( data: Update_Property ): Observable<any> {
    return this.http.put<Update_Property>( `${ property_api_routes.UPDATE_PROPERTY }`, data );
  }

  updatePropertyStatus ( data: Update_Property_Status ): Observable<any> {
    return this.http.put<Update_Property>( `${ property_api_routes.UPDATE_PROPERTY_STATUS }`, data );
  }

  deleteProperty ( data: any ): Observable<any> {
    return this.http.delete<Delete_Property>( `${ property_api_routes.DELETE_PROPERTY }?Ids=${ data }` );
  }

}
