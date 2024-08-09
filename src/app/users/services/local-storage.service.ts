import { DestroyRef, inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private destroyRef: DestroyRef = inject(DestroyRef);

  getItem(token: string) {
    const item = localStorage.getItem(token);
    return item ? JSON.parse(item) : null;
  }

  setItem(token: string, data: Observable<User[]>) {
    data
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((users) => localStorage.setItem(token, JSON.stringify(users)))
      )
      .subscribe();
  }

  removeItem(token: string) {
    localStorage.removeItem(token);
  }
}
