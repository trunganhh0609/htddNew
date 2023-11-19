import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { ApiUrlUtil } from 'src/app/utils/api-url.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMngService {

  constructor(
    private http: HttpClient
    ) { }

  searchUser():Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/searchUser');
    return this.http.get<any>(url, {headers});
  }

  addUser(param:any):Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/addUser');
    return this.http.post<any>(url, param, {headers});
  }

  updateUser(param:any):Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/updateUser');
    return this.http.post<any>(url, param, {headers});
  }

  deleteUser(param:any):Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/deleteUser');
    return this.http.post<any>(url, param, {headers});
  }
}
