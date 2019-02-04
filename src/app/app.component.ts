import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppActionTypes } from './store/types/app.types';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private cookies: CookieService,
    private route: ActivatedRoute,
    private store: Store<any>,
  ) {
    translate.addLangs(['en', 'mm']);
    const r = this.route.snapshot.params;
    if (r['lang'] && r['lang'] === 'en') {
      translate.setDefaultLang('en');
    } else {
      translate.setDefaultLang('mm');
    }
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|mm/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.store.dispatch({
      type: AppActionTypes.LocalLogin,
    });
  }
}
