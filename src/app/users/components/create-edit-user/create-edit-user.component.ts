import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { createId } from '../../utilities/createId.utilities';
import { Store, select } from '@ngrx/store';
import { usersSelector } from '../../store/selectors';
import { Observable, tap } from 'rxjs';
import { AppStateInterface } from '../../interfaces/appState.interface';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
  isEdit!: boolean;
  userForm!: FormGroup;
  users!: User[];
  constructor(
    private store: Store,
    private dialog: MatDialogRef<CreateEditUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: User
  ) {
    this.isEdit = !!data;
    this.initialaxeForm();
  }
  ngOnInit(): void {
    this.store
      .pipe(
        select(usersSelector),
        tap((users) => {
          this.users = users;
        })
      )
      .subscribe();
  }

  initialaxeForm(): void {
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
