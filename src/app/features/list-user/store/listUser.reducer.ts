import { createReducer, on } from '@ngrx/store';
import * as ListUserActions from './listUser.actions';
import { User } from '../interfaces/listUser.interface';

export interface ListUserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: ListUserState = {
  users: [],
  loading: false,
  error: null
};

export const listUserReducer = createReducer(
  initialState,

  // Load
  on(ListUserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // Load Success
  on(ListUserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users
  })),

  // Load Failure
  on(ListUserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);