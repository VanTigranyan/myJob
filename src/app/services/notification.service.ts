import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  private genSnack(classes: string[], message: string) {
    this.snack.open(
      message,
      null,
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: classes,
      });
  }

  // red
  public error(message: string) {
    this.genSnack(['snack', 'snack-error'], message);
  }

  // green
  public success(message: string) {
    this.genSnack(['snack', 'snack-success'], message);
  }

  // orange
  public warn(message: string) {
    this.genSnack(['snack', 'snack-warning'], message);
  }

  // blue
  public info(message: string) {
    this.genSnack(['snack', 'snack-info'], message);
  }

  // violet
  public note(message: string) {
    this.genSnack(['snack', 'snack-primary'], message);
  }
}
