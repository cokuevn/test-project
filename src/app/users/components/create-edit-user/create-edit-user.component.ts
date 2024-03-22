import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../shared/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  isEdit!: boolean;
  userForm!: FormGroup;
  constructor(
    private userService: UsersService,
    public dialog: MatDialogRef<CreateEditUserComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.isEdit = !!data;
    this.userForm = fb.group({
      id: [
        data
          ? data.id
          : this.userService.users[this.userService.users.length - 1].id + 1,
      ],
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
