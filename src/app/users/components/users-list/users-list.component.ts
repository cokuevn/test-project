import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  users$: Observable<User[]> = this.usersService.users$;
  constructor(
    public dialogRef: MatDialog,
    public usersService: UsersService,
    private usersApiService: UsersApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const currentUsers = this.localStorageService.getItem('currentUsers');
    if (!currentUsers) {
      this.usersApiService
        .getUsers()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap({
            next: (users) => {
              this.localStorageService.setItem('currentUsers', this.users$);
              this.usersService.setUsers(users);
            },
          }),
          catchError((error) => {
            console.error(
              'Error: Ошибка при получении данных полтзователя',
              error
            );
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.usersService.setUsers(currentUsers);
    }
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);

    this.localStorageService.setItem('currentUsers', this.users$);
  }

  openDialog(user?: User) {
    const dialogRef = this.dialogRef.open(CreateEditUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result) => {
          if (user) {
            this.usersService.updateUser(result);
          } else {
            this.usersService.addUser(result);
          }
          this.localStorageService.setItem('currentUsers', this.users$);
        }),
        catchError((error) => {
          console.error('Error create or edit:', error);
          return of(null);
        })
      )
      .subscribe();
  }
}
