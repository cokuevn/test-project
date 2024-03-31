import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { UsersStateInterface } from '../interfaces/usersState.interface';
import {
  AddUserAction,
  DeleteUserAction,
  UpdateUserAction,
} from '../store/actions/users.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store<UsersStateInterface>) {}

  addUser(user: User) {
    this.store.dispatch(AddUserAction({ user }));
  }

  deleteUser(id: number) {
    this.store.dispatch(DeleteUserAction({ id }));
  }

  updateUser(user: User) {
    this.store.dispatch(UpdateUserAction({ user }));
  }
}
