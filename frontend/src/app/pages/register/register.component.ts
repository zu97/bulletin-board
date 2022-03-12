import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { registerUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  isLoading: Observable<boolean>;
  error: Observable<null | RegisterError>;

  private errorSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.users.registerLoading);
    this.error = store.select(state => state.users.registerError);
  }

  ngAfterViewInit(): void {
    this.errorSubscription = this.error.subscribe((error) => {
      if (error) {
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      } else {
        this.form.form.get('email')?.setErrors(null);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(registerUserRequest({ userData: this.form.value }));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
