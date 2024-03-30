import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { UserStateInterface } from '../interfaces/userState';
import {
  addUser,
  deleteUser,
  updateUser,
} from '../store/actions/loadUsers.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store<UserStateInterface>) {}

  addUser(user: User) {
    this.store.dispatch(addUser({ user }));
  }

  deleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }

  updateUser(user: User) {
    this.store.dispatch(updateUser({ user }));
  }
}
