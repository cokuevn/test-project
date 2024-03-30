import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateInterface } from '../interfaces/userState';

export const userFeatureSelector =
  createFeatureSelector<UserStateInterface>('user');

export const loadingSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.loading
);

export const usersSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.users
);
