import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { Store, select } from '@ngrx/store';
import { LoadUsersAction } from '../../store/actions/users.actions';
import { loadingSelector, usersSelector } from '../../store/selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users$?: Observable<User[]>;
  destroyRef: DestroyRef = inject(DestroyRef);
  constructor(
    public dialogRef: MatDialog,
    public usersService: UsersService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(usersSelector));
    this.store.dispatch(LoadUsersAction());
  }

  openCreateEditDialog(user?: User): void {
    const dialogRef = this.dialogRef.open(CreateEditUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result) => {
          if (!result) return;
          if (user) {
            this.usersService.updateUser(result);
          } else {
            this.usersService.addUser(result);
          }
        })
      )
      .subscribe();
  }
}
