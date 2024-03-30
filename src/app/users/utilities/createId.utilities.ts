import { User } from '../interfaces/user.interface';

export const createId = (users: User[]) => {
  return Math.max(...users.map((user) => user.id)) + 1;
};
