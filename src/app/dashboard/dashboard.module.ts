import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { jobReducer } from '../store/reducers/jobs.reducer';
import { JobEffects } from '../store/effects/jobs.effects';
import { ApplicationEffects } from '../store/effects/applications.effects';
import { reducers } from '../store/reducers';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { JobListComponent } from './job-list/job-list.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature([
      JobEffects,
      ApplicationEffects,
    ]),
    TranslateModule,
    NgxEditorModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  declarations: [DashboardComponent, JobListComponent, JobPostingComponent, CandidateListComponent],
})
export class DashboardModule {}
