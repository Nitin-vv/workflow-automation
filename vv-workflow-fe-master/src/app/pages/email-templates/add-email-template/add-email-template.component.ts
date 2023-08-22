import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EmailTemplatesService } from '../../services/email-templates.service';
import { Create_Email, Update_Email } from '../../shared/models/email.model';
import { AppState } from '../../store';
import * as actions from '../../store/email-templates/email.actions';


@Component( {
  selector: 'vex-add-email-template',
  templateUrl: './add-email-template.component.html',
  styleUrls: [ './add-email-template.component.scss' ],
  encapsulation: ViewEncapsulation.None
} )
export class AddEmailTemplateComponent implements OnInit {
  emailForm: FormGroup;
  templateCount: number = 0;
  isEdit: boolean = false;

  constructor (
    private emailService: EmailTemplatesService,
    private store$: Store<AppState>,
    private dialogRef: MatDialogRef<AddEmailTemplateComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,

  ) { }

  ngOnInit (): void {
    this.initForm()
    if ( this.data.isEdit ) {
      this.isEdit = true;
      this.emailForm.patchValue( {
        title: this.data?.row?.title,
        subject: this.data?.row?.subject,
        body: this.data?.row?.body,
        status: this.data?.row?.status,
      } );
    }
  }

  initForm () {
    this.emailForm = new FormGroup( {
      title: new FormControl( '', Validators.required ),
      subject: new FormControl( '' ),
      body: new FormControl( '' ),
      status: new FormControl( true, Validators.required ),
    } )
  }

  addSmsTemplates () {
    const payload: Update_Email = {
      title: this.emailForm.value.title,
      subject: this.emailForm.value.subject,
      body: this.emailForm.value.body,
      status: this.emailForm.value.status,
      id: this.data?.row?.id
    }
    if ( this.isEdit ) {
      this.store$.dispatch( new actions.UpdateEmail( payload ) )
    } else {
      const payload: Create_Email = {
        title: this.emailForm.value.title,
        subject: this.emailForm.value.subject,
        body: this.emailForm.value.body,
        status: this.emailForm.value.status
      }
      this.store$.dispatch( new actions.CreateEmail( payload ) )
    }
    this.dialogRef.close();
    this.emailForm.reset()
  }

  updateTemplateCount () {
    const templateValue = this.emailForm.get( 'body' )?.value;
    this.templateCount = templateValue ? templateValue.length : 0;
  }

  cancel () {
    this.dialogRef.close();
    this.emailForm.reset()
  }
}
