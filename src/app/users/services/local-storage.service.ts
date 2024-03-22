import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(token: string): string | null {
    return localStorage.getItem(token);
  }
  setItem(token: string, data: string) {
    localStorage.setItem(token, data);
    return data;
  }
  removeItem(token: string): boolean {
    localStorage.removeItem(token);
    return true;
  }
}
