import { AuthEffects } from './store/effects/auth.effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';
// Angular Material
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
// Angular Flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';
// ngx-translate
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// ngx-loading-bar
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// ngx-perfect-scrollbar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// google maps
import { AgmCoreModule } from '@agm/core';
// Template core components
import {
  AccordionAnchorDirective,
  AccordionDirective,
  AccordionLinkDirective,
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  MenuComponent,
  OptionsComponent,
  SidebarComponent,
  FooterComponent,
} from './core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducers/auth.reducer';
import { AppEffects } from './store/effects/app.effects';
import { environment } from '../environments/environment';
import { NotificationService } from './services/notification.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 2,
  wheelPropagation: true,
};

// Error handling
import { HttpMainInterceptor } from './services/http.interceptor';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    OptionsComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    FooterComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      authState: authReducer,
    }),
    EffectsModule.forRoot([AppEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'MyJobs App Devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    LoadingBarRouterModule,
    LoadingBarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOURAPIKEY',
    }),
    PerfectScrollbarModule,
    MatSnackBarModule,
    ErrorModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    CookieService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMainInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
