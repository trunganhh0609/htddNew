import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlUtil } from 'src/app/utils/api-url.util';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { HeadersUtil } from 'src/app/utils/header.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassMngService {

  constructor(
    private http: HttpClient
    ) { }


  getData(){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/getListClass');
    return this.http.get<any>(url, {headers});
  }

  searchTeacher(keySearch:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/searchTeacher?keySearch='+keySearch);
    return this.http.get<any>(url, {headers});
  }

  addClass(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/addClass');
    return this.http.post<any>(url, param, {headers});
  }

  updateClass(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/updateClass');
    return this.http.post<any>(url, param, {headers});
  }

  deleteClass(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/deleteClass');
    return this.http.post<any>(url, param, {headers});
  }

  getStudentInClass(classId:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/getStudentInClass?classId='+classId);
    return this.http.get<any>(url, {headers});
  }

  getStudentOption(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/getStudentOption');
    return this.http.post<any>(url, param, {headers});
  }

  addStudentToClass(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/addStudentToClass');
    return this.http.post<any>(url, param, {headers});
  }

  deleteStudentInClass(param:any){
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/deleteStudentInClass');
    return this.http.post<any>(url, param, {headers});
  }

  importExcelFile(data:any){
    const url = ApiUrlUtil.buildQueryString(environment.apiURL + '/class/importExcelStudent');
    return this.http.post<any>(url, data);
  }
}
