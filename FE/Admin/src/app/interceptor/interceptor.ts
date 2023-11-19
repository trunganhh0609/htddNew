import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { ThienAnConstant } from '../constants/thien-an.constant';
import { AuthenticationUtil } from '../utils/authentication.util';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': AuthenticationUtil.getToken(),
      },
    });

    return next.handle(req);
  }
}
