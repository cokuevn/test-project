import { Action, createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from '../interfaces/usersState.interface';
import {
  AddUserAction,
  DeleteUserAction,
  LoadUsersAction,
  LoadUsersFailureAction,
  LoadUsersSuccesAction,
  UpdateUserAction,
} from './actions/users.actions';

const initialState: UsersStateInterface = {
  users: [],
  loading: false,
  erorr: null,
};

const loadUsersReducer = createReducer(
  initialState,
  on(
    LoadUsersAction,
    (state): UsersStateInterface => ({
      ...state,
      loading: true,
    })
  ),
  on(
    LoadUsersSuccesAction,
    (state, { users }): UsersStateInterface => ({
      ...state,
      users,
      loading: false,
    })
  ),
  on(LoadUsersFailureAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AddUserAction, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UpdateUserAction, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(DeleteUserAction, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
  }))
);

export function reducers(state: UsersStateInterface, action: Action) {
  return loadUsersReducer(state, action);
}
