import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { UsersService } from '../services/users.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { AppState } from './types';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersEffects {

  constructor(
    private router: Router,
    private actions: Actions,
    private usersService: UsersService,
    private helpersService: HelpersService,
    private store: Store<AppState>
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map((user) => registerUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(registerUserFailure),
    )),
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map((user) => loginUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(loginUserFailure),
    )),
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.usersService.logoutUser(user.token).pipe(
          map(() => logoutUser()),
          tap(() => {
            this.helpersService.openSnackBar('Logout successful');
            void this.router.navigate(['/']);
          }),
        );
      }

      return NEVER;
    }),
  ));

}
