import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies';
import { AuthConstant } from '../constants/auth.constant';

export class AuthenticationUtil {

  constructor(
    // @Inject(DOCUMENT) public document: any,
  ) {}

  public static saveToken(token: string) {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    Cookie.set(AuthConstant.ACCESS_TOKEN_KEY, token);
  }

  public static removeToken() {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
  }

  public static removeCookie(){

  }

  public static getToken() {
    return "Bearer " + Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);
  }

  public static isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public static getUserName() {
    let decodeToken = this.decodeToken();
    return decodeToken.sub;
  }

  public static decodeToken() {
    let token: any = this.getToken();
    let helper = new JwtHelperService();
    let decodeToken = helper.decodeToken(token);
    return decodeToken;
  }

  public static isTokenExpired():boolean{
    const jwt = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);
    if(jwt){
      let token: any = this.getToken();
      let helper = new JwtHelperService();
      return helper.isTokenExpired(token);
    }else{
      return true;
    }

  }

  public static saveUserInfo(userInfo: any){
    Cookie.set('userInfo', userInfo);
  }

  public static getUserInfo(){
    return Cookie.get('userInfo');
  }

  public static savePrivateKeyToCookie(privateKey: any) {
    Cookie.set(AuthConstant.PRIVATE_KEY, privateKey);
  }

  public static getPrivateKey(){
    return Cookie.get(AuthConstant.PRIVATE_KEY);
  }

  public static deleteAllCookie(){
    Cookie.deleteAll();
  }
}
