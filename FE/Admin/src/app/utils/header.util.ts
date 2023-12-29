import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ThienAnConstant } from "../constants/thien-an.constant";
import { AuthConstant } from "../constants/auth.constant";
import { Cookie } from "ng2-cookies";
import { AuthenticationUtil } from "./authentication.util";

export class HeadersUtil{
  public static getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public static getHeaderAuthTA(token:any){
    const header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
    return header;
  }
  public static getHeadersAuth(): HttpHeaders {
    const token = '';
    if (!token) {
      return HeadersUtil.getHeaders();
    }
    const header :HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token,
    });
    return header;
  }
  public static getHeadersAuthMultipart(): HttpHeaders {
    const token =  AuthenticationUtil.getToken();
    if (!token) {
      return HeadersUtil.getHeaders();
    }

    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': token,
    });
  }

}
