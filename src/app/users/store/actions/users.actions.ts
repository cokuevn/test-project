import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { User } from '../../interfaces/user.interface';

export const LoadUsersAction = createAction(ActionTypes.LOAD_USERS);

export const LoadUsersSuccesAction = createAction(
  ActionTypes.LOAD_USERS_SUCCES,
  props<{ users: User[] }>()
);

export const LoadUsersFailureAction = createAction(
  ActionTypes.LOAD_USERS_FAILURE,
  props<{ error: any }>()
);

export const AddUserAction = createAction(
  ActionTypes.ADD_USER,
  props<{ user: User }>()
);

// Действие для обновления пользователя
export const UpdateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ user: User }>()
);

// Действие для удаления пользователя
export const DeleteUserAction = createAction(
  ActionTypes.DELETE_USER,
  props<{ id: number }>()
);
