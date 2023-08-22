import {ChangeDetectorRef,Component,OnInit} from '@angular/core';
import {UntypedFormBuilder,UntypedFormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from 'src/app/pages/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  form: UntypedFormGroup;
  inputType='password';
  visible=false;

  constructor(private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form=this.fb.group({
      fullName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@]{8,}$/)]],
      passwordConfirm: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@]{8,}$/)]],
      acceptTerms: [false,Validators.required],
    });
  }

  send() {
    this.form.markAllAsTouched()
    if(this.form.valid) {
      if(this.form.value.acceptTerms==true) {
        if(this.form.value.password==this.form.value.passwordConfirm) {
          const paylaod={
            name: this.form.value.fullName,
            email: this.form.value.email,
            password: this.form.value.password,
          }
          this.auth.signup(paylaod).subscribe((res: any) => {
            if(res.statusCode==200) {
              this.router.navigate(['/login']);
            }
          })
        } else {
          this.form.get("passwordConfirm")?.setErrors({'required': true});
        }
      }
    }
  }

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
