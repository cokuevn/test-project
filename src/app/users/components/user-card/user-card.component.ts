import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true })
  public user!: User;
  @Output()
  public deleteUser = new EventEmitter<number>();

  onDeleteUser(id: number) {
    this.deleteUser.emit(id);
  }
}
