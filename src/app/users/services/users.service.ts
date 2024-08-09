import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  addUser(user: User): void {
    const updatedUsers = [...this.usersSubject.getValue(), user];
    this.usersSubject.next(updatedUsers);
  }

  deleteUser(id: number): void {
    const updatedUsers = this.usersSubject
      .getValue()
      .filter((user) => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }

  updateUser(updatedUser: User): void {
    const updatedUsers = this.usersSubject
      .getValue()
      .map((user) => (user.id === updatedUser.id ? updatedUser : user));
    this.usersSubject.next(updatedUsers);
  }
}
