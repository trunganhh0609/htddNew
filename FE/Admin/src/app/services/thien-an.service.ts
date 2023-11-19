import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThienAnConstant } from 'src/app/constants/thien-an.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThienAnService {

  constructor(
    private http: HttpClient,
  ) { }

  getLstClassByTeacherId(param:any): Observable<any> {
    const headers = {'Authorization' : ThienAnConstant.AUTHORIZATION_TOKEN};
    return this.http.post<any>(environment.thienAnUrl, param, {headers});
  }
}
