import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersApiService } from '../../services/users-api.service';
import {
  LoadUsersAction,
  LoadUsersFailureAction,
  LoadUsersSuccesAction,
} from '../actions/users.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadUsersAction),
      switchMap(() =>
        this.usersApiService.getUsers().pipe(
          map((users) => LoadUsersSuccesAction({ users })),
          catchError((error) => of(LoadUsersFailureAction({ error })))
        )
      )
    )
  );
}
