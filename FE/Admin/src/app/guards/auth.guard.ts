import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import { AuthenticationUtil } from '../utils/authentication.util';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private route: Router
  ) {
    // this.saveAccessToken();
  }

  canActivate(): boolean {
    if(this.checkLogin()){
      return true;
    }else{
      this.route.navigate(['account/login']);
      return false;
    }

  }

  canLoad(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
   return !AuthenticationUtil.isTokenExpired()
  }

  // saveAccessToken(){
  //   debugger
  //   let accessToken = this.route.snapshot.params["accessToken"]
  //   if (accessToken){
  //       AuthenticationUtil.saveToken(accessToken);
  //   }
  // }

}
