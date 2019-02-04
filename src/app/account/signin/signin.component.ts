import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

import { AuthActionTypes } from './../../store/types/auth.types';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    private title: Title,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.title.setTitle('MyJobs | Sign In');
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  // this.router.navigate(['/employers'], { queryParams: { page: 'active' } });

  onSubmit() {
    const { uname, password } = this.form.value;
    this.store.dispatch({
      type: AuthActionTypes.Login,
      payload: {
        password,
        username: uname,
      },
    });
  }
}
