// import { Location } from '@angular/common';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, createEffect , ofType } from '@ngrx/effects';
// import { map, tap } from 'rxjs/operators';

// import * as RouterActions from './router.action';

// @Injectable()
// export class RouterEffects {
//   /**
//    * Navigate
//    */

//   navigate$=createEffect(() =>
//   this.actions$.pipe(
//     ofType(RouterActions.GO),
//     map((action: RouterActions.Go) => action.payload),
//     tap(({ path, query: queryParams, extras }) => {
//       this.router.navigate(path, { ...queryParams, ...extras });
//     })
//   )
//   )
//   // @Effect({ dispatch: false })
//   // navigate$ = this.actions$.pipe(
//   //   ofType(RouterActions.GO),
//   //   map((action: RouterActions.Go) => action.payload),
//   //   tap(({ path, query: queryParams, extras }) => {
//   //     this.router.navigate(path, { ...queryParams, ...extras });
//   //   })
//   // );

//   /**
//    * Navigate back
//    * @type {Observable<any>}
//    */
//   @Effect({ dispatch: false })
//   navigateBack$ = this.actions$.pipe(
//     ofType(RouterActions.BACK),
//     tap(() => this.location.back())
//   );

//   /**
//    * Navigate forward
//    * @type {Observable<any>}
//    */
//   @Effect({ dispatch: false })
//   navigateForward$ = this.actions$.pipe(
//     ofType(RouterActions.FORWARD),
//     tap(() => this.location.forward())
//   );
//   /**
//    * Constructor
//    *
//    * @param {Actions} actions$
//    * @param {Router} router
//    * @param {Location} location
//    */
//   constructor(
//     private actions$: Actions,
//     private router: Router,
//     private location: Location
//   ) {}
// }
