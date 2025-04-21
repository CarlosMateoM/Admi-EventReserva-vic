import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/listUser.interface';

// LOAD
export const loadUsers = createAction('[ListUser] Load Users', props<{ force?: boolean }>());

// LOAD SUCCESS
export const loadUsersSuccess = createAction('[ListUser] Load Users Success', props<{ users: User[] }>());

// LOAD FAILURE
export const loadUsersFailure = createAction('[ListUser] Load Users Failure', props<{ error: string }>());

