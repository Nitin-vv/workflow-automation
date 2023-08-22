import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filter } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { action_api_routes } from '../enums/auth.enum';


@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor ( private http: HttpClient ) { }

  getActions ( requestParams: Filter ): Observable<any> {
    let paramObj = {
      order_by: requestParams.order_by,
      order_dir: requestParams.order_dir,
      page: requestParams.page.toString(),
      per_page: requestParams.per_page.toString(),
      search: requestParams?.search
    };
    return this.http.get<any>( `${ action_api_routes.GET_ACTION }?page=${ paramObj.page }&per_page=${ paramObj.per_page } `, { });
  }
}
