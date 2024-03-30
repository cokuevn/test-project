import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { createId } from '../../utilities/createId.utilities';
import { Store, select } from '@ngrx/store';
import { usersSelector } from '../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  isEdit!: boolean;
  userForm!: FormGroup;
  users!: User[];
  constructor(
    private store: Store,
    private dialog: MatDialogRef<CreateEditUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: User
  ) {
    this.store.pipe(select(usersSelector)).subscribe((users) => {
      this.users = users;
    });
    this.isEdit = !!data;
    this.userForm = fb.group({
      id: [data ? data.id : createId(this.users)],
      name: [data ? data.name : '', Validators.required],
      username: [data ? data.username : '', Validators.required],
      email: [data ? data.email : '', Validators.required],
    });
  }
  onCancel(): void {
    this.dialog.close();
  }

  onSave(): void {
    this.dialog.close(this.userForm.value);
  }
}
