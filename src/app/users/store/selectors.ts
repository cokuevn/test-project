import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateInterface } from '../interfaces/usersState.interface';

export const userFeatureSelector =
  createFeatureSelector<UsersStateInterface>('users');

export const loadingSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.loading
);

export const usersSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.users
);
