import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(token: string) {
    const item = localStorage.getItem(token);
    return item ? JSON.parse(item) : null;
  }

  setItem(token: string, data: Observable<User[]>) {
    data
      .pipe(tap((users) => localStorage.setItem(token, JSON.stringify(users))))
      .subscribe();
  }

  removeItem(token: string) {
    localStorage.removeItem(token);
  }
}
