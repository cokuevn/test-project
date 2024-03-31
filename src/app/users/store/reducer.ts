import { Action, createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from '../interfaces/usersState.interface';
import {
  LoadUsersAction,
  LoadUsersFailuryAction,
  LoadUsersSuccesAction,
} from './actions/users.action';

const InitionalState: UsersStateInterface = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = createReducer(
  InitionalState,
  on(LoadUsersAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(LoadUsersSuccesAction, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
  })),
  on(LoadUsersFailuryAction, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducers(state: UsersStateInterface, action: Action) {
  return usersReducer(state, action);
}
