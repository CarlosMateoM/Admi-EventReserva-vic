import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LisUserService } from '../lis-user.service';
import * as ListUserActions from './listUser.actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUsers } from './listUser.selectors';

@Injectable()
export class ListUserEffects {

    private actions$: Actions = inject(Actions);
    private userService: LisUserService = inject(LisUserService);
    private store: Store = inject(Store);


    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ListUserActions.loadUsers),
            withLatestFrom(this.store.select(selectUsers)),
            filter(([action, users]) => {
                const force = action.force ?? false;
                return force || !users || users.length === 0;
            }),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map(users => ListUserActions.loadUsersSuccess({ users })),
                    catchError(error =>
                        of(ListUserActions.loadUsersFailure({ error: error.message }))
                    )
                )
            )
        )
    );


}
