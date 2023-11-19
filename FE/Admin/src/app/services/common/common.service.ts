import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // menuData = new BehaviorSubject<any>({})
  // menuDataFull = new BehaviorSubject<any>({})
  // currentData =this.menuData.asObservable();
  // currentDataFull =this.menuDataFull.asObservable();
  tempData : any = [];
  tempDataFull: any = [];
  constructor(
    private http: HttpClient,
  ) {}

  getClassByTeacher():Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = environment.apiURL + "/class/getClassByTeacher";
    return this.http.get<any>(url, {headers});
  }
  getStudentInClass(param:any):Observable<any>{
    const headers = { 'Authorization': AuthenticationUtil.getToken() };
    const url = "http://daotao.hnue.edu.vn/UniDormAPI//SQLExecute/ExecuteQuerryString";
    return this.http.post<any>(url, param , {headers});
  }


}

