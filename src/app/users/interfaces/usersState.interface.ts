import { User } from './user.interface';

export interface UsersStateInterface {
  users: User[];
  loading: boolean;
  erorr: null;
}
