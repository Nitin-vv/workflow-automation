import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/pages/store';
import { Store } from '@ngrx/store';
import { Observable, Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { dataSelector as userInfoSelector } from 'src/app/pages/store/auth/authentication.selector';

@Component({
  selector: 'vex-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialProfileComponent implements OnInit {
  profileForm:FormGroup;
  userInfo$: Observable<any>;
  userInfo: any = null;
  private onDestroy$ = new Subject<void>();

  constructor
  (
    private fb:FormBuilder,
    private store$: Store<AppState>,
  ) { this.userInfo$ = this.store$.select( userInfoSelector ) }

  ngOnInit(): void {
    this.initForm();
    this.userInfo$
    .pipe(
      debounceTime( 10 ),
      takeUntil( this.onDestroy$ ),
      tap( userInfo => {
        this.userInfo = userInfo;
        if(this.userInfo) {
          this.profileForm.patchValue({
            fullname: [this.userInfo.data.name],
            email: [this.userInfo.data.email],
            role: [this.userInfo.data.role]
          })
        }
      } )
    )
    .subscribe();
  }

  initForm() {
    this.profileForm = this.fb.group({
      fullname: [''],
      email: [''],
      role: ['']
    })
  }

}
