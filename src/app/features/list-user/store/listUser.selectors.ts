import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListUserState } from './listUser.reducer';

export const selectListUserState = createFeatureSelector<ListUserState>('listUser');

export const selectUsers = createSelector(
  selectListUserState,
  (state: ListUserState) => state.users
);

export const selectLoading = createSelector(
  selectListUserState,
  (state: ListUserState) => state.loading
);

export const selectError = createSelector(
  selectListUserState,
  (state: ListUserState) => state.error
);
