import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/loadUsers.effect';
const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
];

@NgModule({
  declarations: [
    UserCardComponent,
    UsersListComponent,
    CreateEditUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects]),
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [RouterModule],
})
export class UsersModule {}
