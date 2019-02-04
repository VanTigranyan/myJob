import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'job-list',
  },
  {
    path: 'job-list',
    component: JobListComponent,
  },
  {
    path: 'edit-job/:param',
    component: JobPostingComponent,
  },
  {
    path: 'job-info/:id',
    component: CandidateListComponent,
  },
];
