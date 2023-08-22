import {ChangeDetectionStrategy,ChangeDetectorRef,Component,OnInit} from '@angular/core';
import {UntypedFormBuilder,UntypedFormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from 'src/app/pages/services/auth.service';
import { AppState } from '../../../store';
import * as actions from '../../../store/auth/authentication.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  inputType='password';
  visible=false;

  constructor(private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.form=this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  send() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      const payload={
        email: this.form.value.email,
        password: this.form.value.password
      }
      this.store.dispatch(new actions.Login(payload));
      // this.router.navigateByUrl('/')
      // this.auth.login(payload).subscribe((res: any) => {
      //   if(res.statusCode==200) {
      //     localStorage.setItem('token',res.token)
      //     this.router.navigate(['/']);
      //   }
      // })
    }
  }

  // addCompany() {
  //   let payload = this.addCompanyForm.value;
  //   payload.adminid = this.adminId;
  //   this._adminSer.addCompany(payload).subscribe((res: any) => {
  //       if (res) {
  //         this.dialogRef.close();
  //         this._adminSer.refreshCompanyTableSubject.next(true);
  //         this.snackBar.open(res.message, 'Cancel', {
  //           duration: 3000,
  //         });
  //       }
  //     },
  //     (error) => {
  //       if (error.status === 409) {
  //         this.snackBar.open(error.error.message, 'Cancel', {
  //           duration: 3000,
  //         });
  //       }
  //     }
  //   );
  // }

  toggleVisibility() {
    if(this.visible) {
      this.inputType='password';
      this.visible=false;
      this.cd.markForCheck();
    } else {
      this.inputType='text';
      this.visible=true;
      this.cd.markForCheck();
    }
  }
}
