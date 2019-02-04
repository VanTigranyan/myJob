import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountRoutes } from './account.routing';
import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '../store/reducers/auth.reducer';
import { AuthEffects } from '../store/effects/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    StoreModule.forFeature('authState', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ForgotComponent,
    SigninComponent,
  ],
})
export class AccountModule {}
