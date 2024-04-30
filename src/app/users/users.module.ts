import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { FormComponent } from './components/form/form.component';
const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [
    UserCardComponent,
    UsersListComponent,
    CreateEditUserComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MaterialModule,
    StoreModule.forFeature('users', reducers),
  ],
  exports: [RouterModule],
})
export class UsersModule {}
