import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(token: string) {
    const item = localStorage.getItem(token);
    return item ? JSON.parse(item) : null;
  }

  setItem(token: string, data: User[]) {
    localStorage.setItem(token, JSON.stringify(data));
  }

  removeItem(token: string) {
    localStorage.removeItem(token);
  }
}
