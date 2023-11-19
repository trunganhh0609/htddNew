import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlUtil } from 'src/app/utils/api-url.util';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryAttendanceService {

  constructor(
    private http: HttpClient,
  ) { }

  addHistory(param: any): Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/addHistory');
    return this.http.post<any>(url, param, {headers});

  }
}
