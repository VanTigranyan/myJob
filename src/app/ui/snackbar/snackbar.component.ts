import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  template: `<div></div>`,
  providers: [MatSnackBar],
})
export class SnackbarComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    public service: SnackbarService,
  ) {}
  ngOnInit() {
    this.service.message.subscribe((msg: string) => this.snackBar.open(msg, null, { duration: 2000 }));
    this.snackBar.open(
      'Welcome to board',
      null,
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snack'],
      });
  }

}
