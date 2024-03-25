import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];

  constructor() {}

  setUsers(users: User[]) {
    this.users = users;
  }

  addUser(user: User) {
    this.users = [...this.users, user];
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(updatedUser: User): void {
    const updatedUsers = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this.users = updatedUsers;
  }
}
