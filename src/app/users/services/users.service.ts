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

  updateUser(updatedUser: User): boolean {
    console.log(updatedUser);
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      // Создаем новый объект данных пользователя
      const newUser = { ...updatedUser };
      // Обновляем пользователя в массиве пользователей
      this.users[index] = newUser;
      console.log(newUser);
      return true;
    } else {
      return false;
    }
  }
}
