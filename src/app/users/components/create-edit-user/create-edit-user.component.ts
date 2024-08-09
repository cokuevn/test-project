import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { createId } from '../../utils/createId';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnChanges {
  isEdit!: boolean;
  userForm!: FormGroup;
  users!: User[];
  constructor(
    private userService: UsersService,
    public dialog: MatDialogRef<CreateEditUserComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.isEdit = !!data;
    this.userForm = fb.group({
      id: [data ? data.id : createId(this.users)],
      name: [data ? data.name : '', Validators.required],
      username: [data ? data.username : '', Validators.required],
      email: [data ? data.email : '', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userService.users$
      .pipe(tap((users) => ((this.users = users), console.log(this.users))))
      .subscribe();
  }

  onCancel(): void {
    this.dialog.close();
  }

  onSave(): void {
    this.dialog.close(this.userForm.value);
  }
}
