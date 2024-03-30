import { Action, createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '../interfaces/userState';
import {
  LoadUsersAction,
  LoadUsersFailureAction,
  LoadUsersSuccesAction,
  addUser,
  deleteUser,
  updateUser,
} from './actions/loadUsers.actions';

const initialState: UserStateInterface = {
  users: [],
  loading: false,
  erorr: null,
};

const loadUsersReducer = createReducer(
  initialState,
  on(
    LoadUsersAction,
    (state): UserStateInterface => ({
      ...state,
      loading: true,
    })
  ),
  on(
    LoadUsersSuccesAction,
    (state, { users }): UserStateInterface => ({
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
  on(addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
  }))
);

export function reducers(state: UserStateInterface, action: Action) {
  return loadUsersReducer(state, action);
}
