import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { Subject, tap } from 'rxjs';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

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
          tap({
            next: (users) => {
              this.localStorageService.setItem('currentUsers', users);
              this.usersService.setUsers(users);
            },
            error: (error) => {
              console.error(
                'Ошибка при получении данных о пользователях:',
                error
              );
            },
          })
        )
        .subscribe();
    } else {
      this.usersService.setUsers(currentUsers);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
    this.localStorageService.setItem('currentUsers', this.usersService.users);
  }

  openDialog(user?: User) {
    const dialogRef = this.dialogRef.open(CreateEditUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (user) {
        this.usersService.updateUser(result);
      } else {
        this.usersService.addUser(result);
      }
      this.localStorageService.setItem('currentUsers', this.usersService.users);
    });
  }
}
