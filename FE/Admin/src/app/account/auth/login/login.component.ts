import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { MessageService } from 'primeng/api';
import { UserProfileService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  submitted = false;
  error = '';
  returnUrl: string;
  userName: string = '';
  password: string = '';
  jwtHelper = new JwtHelperService();
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,
    private authenService: AuthenticationService,
    private messageService: MessageService,
    private userService: UserProfileService
    ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    const param = {
      "userName" : this.userName,
      "password" : this.password
    }
    this.authenService.logIn(param).subscribe(res=>{
      console.log(res);

      if(res.jwt){
        AuthenticationUtil.saveToken(res.jwt);
        AuthenticationUtil.saveUserInfo(res.Data.name);
        this.router.navigate(['/']);
      }else{
        this.showError();
      }
    })

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //       this.router.navigate(['/dashboard']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f.email.value, this.f.password.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/dashboard']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }
  showError() {
    this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Tài khoản hoặc mật khẩu không chính xác'});
}
}
