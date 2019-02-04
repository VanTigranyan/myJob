import { Routes } from '@angular/router';

import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';

export const AccountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forgot',
        component: ForgotComponent,
        data: {
          heading: 'Forgot password',
          css: '',
        },
      },
      {
        path: '',
        component: SigninComponent,
        data: {
          heading: 'Signin',
          css: '',
        },
      },
    ],
  },
];
