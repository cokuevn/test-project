import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { catchError, of, tap } from 'rxjs';
import { createId } from '../../utils/createId';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
  public isEdit!: boolean;
  protected userForm!: FormGroup;
  private users!: User[];
  private destroyRef = inject(DestroyRef);

  constructor(
    private usersService: UsersService,
    private dialog: MatDialogRef<CreateEditUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: User
  ) {}
  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.usersService.users$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((users) => {
          this.users = users;
          this.initialazeForm();
        }),
        catchError((error) => {
          console.error('Error initialazeForm:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  initialazeForm(): void {
    this.userForm = this.fb.group({
      id: [this.data ? this.data.id : createId(this.users)],
      name: [this.data ? this.data.name : '', Validators.required],
      username: [this.data ? this.data.username : '', Validators.required],
      email: [this.data ? this.data.email : '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialog.close();
  }

  onSave(): void {
    this.dialog.close(this.userForm.value);
  }
}
