import { User } from './user.interface';

export interface UserStateInterface {
  users: User[];
  loading: boolean;
  erorr: null;
}
