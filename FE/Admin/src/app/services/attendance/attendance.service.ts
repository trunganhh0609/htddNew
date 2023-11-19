import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestParam } from 'src/app/models/request-param';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { ApiUrlUtil } from 'src/app/utils/api-url.util';
import { ParamUtil } from 'src/app/utils/param.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient
  ) { }

  getListAttendanceInLesson(param: any): Observable<any>{
    // const header: HttpHeaders = HeadersUtil.getHeadersAuth();
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/getListAttendanceInLesson', params);
    return this.http.get<any>(url);

  }

  addAbsentStudent(param: any):Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/addAbsentStudent');
    return this.http.post<any>(url, param, {headers});
  }

  getCheckInData(param: any): Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/getCheckInData', params);
    return this.http.get<any>(url, {headers});

  }
}
