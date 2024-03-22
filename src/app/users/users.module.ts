import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
];

@NgModule({
  declarations: [UserCardComponent, UsersListComponent, CreateEditUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class UsersModule {}
