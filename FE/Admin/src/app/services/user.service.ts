import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { RequestParam } from '../models/request-param';
import { Observable } from 'rxjs';
import { ApiUrlUtil } from 'src/app/utils/api-url.util';
import { environment } from 'src/environments/environment';
import { HeadersUtil } from '../utils/header.util';
import { ParamUtil } from '../utils/param.util';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  userInfo: any = {};
    constructor(private http: HttpClient) { }

  getInfoUser(param: any): Observable<any>{
    const header: HttpHeaders = HeadersUtil.getHeadersAuth();
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/userInfo', params);
    return this.http.get<any>(url, { headers: header });
  }


}
