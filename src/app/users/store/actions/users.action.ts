import { createAction, props } from '@ngrx/store';
import { ActionsTypes } from '../actionsTypes';
import { User } from '../../interfaces/user.interface';

export const LoadUsersAction = createAction(ActionsTypes.LOAD_USERS);
export const LoadUsersSuccesAction = createAction(
  ActionsTypes.LOAD_USERS_SUCCES,
  props<{ users: User[] }>()
);
export const LoadUsersFailuryAction = createAction(
  ActionsTypes.LOAD_USERS_FUILLURE,
  props<{ error: any }>()
);
export const AddUserActions = createAction(
  ActionsTypes.ADD_USER,
  props<{ users: User[] }>()
);
export const UpdateUserActions = createAction(
  ActionsTypes.UPDATE_USER,
  props<{ users: User[] }>()
);
export const DeleteUserActions = createAction(
  ActionsTypes.DELETE_USER,
  props<{ id: number }>()
);
