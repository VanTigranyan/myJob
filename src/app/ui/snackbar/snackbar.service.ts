import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
  deps: [MatSnackBar],
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) {}
  public message = new Subject();
  public snackbar = this.snackBar;
  public openSnackbar(message, action, opt) {
    this.snackbar.open(message, action, opt);
  }
  ngOnInit() {
    this.message
      .subscribe((msg: string) => this.snackbar.open(msg, null, { duration: 2000 }));
  }
}
