import { AuthActionTypes } from './../../store/types/auth.types';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {
PerfectScrollbarConfigInterface,
PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [NotificationService],
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  public window = window;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    public notificationService: NotificationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private auth: AuthService,
    private router: Router,
    private store: Store<any>,
  ) {
    iconRegistry.addSvgIcon(
      'search-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/search.svg'),
    );
  }

  onLogout() {
    this.store.dispatch({
      type: AuthActionTypes.Logout,
    });
  }

}
