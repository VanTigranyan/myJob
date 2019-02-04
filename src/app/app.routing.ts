import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'employers/login',
    pathMatch: 'full',
  },
  {
    path: 'en/employers',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: { lang: 'en' },
      },
    ],
  },
  {
    path: 'employers',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: { lang: 'mm' },
      },
    ],
  },
  {
    path: 'employers/login',
    pathMatch: 'full',
    loadChildren: './account/account.module#AccountModule',
  },
  {
    path: 'en/employers/login',
    pathMatch: 'full',
    loadChildren: './account/account.module#AccountModule',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule',
  },
];
