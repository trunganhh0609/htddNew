import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserProfileService } from 'src/app/services/user.service';
import { Cookie } from 'ng2-cookies';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  userInfo: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private userService: UserProfileService,
    private router: Router,
    private authService: AuthenticationService,
    public _cookiesService: CookieService) {
  }

  openMobileMenu: boolean;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.userInfo = Cookie.get('userInfo')
  }

  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
      this.authService.logout();
      // this.authFackservice.logout();
    this.router.navigate(['/account/login']);
  }


}
