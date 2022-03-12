import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionType } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private snackbar: MatSnackBar,
  ) {}

  openSnackBar(message: string, action?: string, config?: MatSnackBarConfig) {
    if (!action) {
      action = 'OK';
    }

    if (!config || !config.duration) {
      config = {...config, duration: 3000};
    }

    return this.snackbar.open(message, action, config);
  }

  catchServerError(action: ActionType<any>) {
    return catchError((e) => {
      let error = null;

      if (e instanceof HttpErrorResponse && e.status === 400) {
        error = e.error;
      } else {
        this.snackbar.open('Server Error', 'OK', {duration: 3000});
      }

      return of(action({ error }));
    });
  }

}
