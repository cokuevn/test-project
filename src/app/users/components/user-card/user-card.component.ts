import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  user!: User;
  @Output()
  deleteUser = new EventEmitter<number>();

  onDeleteUser(id: number) {
    this.deleteUser.emit(id);
  }
}
