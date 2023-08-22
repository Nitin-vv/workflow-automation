import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SmsTemplatesService } from '../../services/sms-templates.service';
import { Create_Sms, Update_Sms } from '../../shared/models/sms.model';
import { AppState } from '../../store';
import * as actions from '../../store/sms-template/sms.actions';


@Component( {
  selector: 'vex-add-sms-template',
  templateUrl: './add-sms-template.component.html',
  styleUrls: [ './add-sms-template.component.scss' ]
} )
export class AddSmsTemplateComponent implements OnInit {

  smsForm: FormGroup;
  templateCount: number = 0;
  isEdit: boolean = false;

  constructor (
    private smsService: SmsTemplatesService,
    private store$: Store<AppState>,
    private dialogRef: MatDialogRef<AddSmsTemplateComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,

  ) { }

  ngOnInit (): void {
    this.initForm()
    if ( this.data.isEdit ) {
      this.isEdit = true;
      this.smsForm.patchValue( {
        title: this.data?.row?.title,
        template: this.data?.row?.template,
        status: this.data?.row?.status,
      } );
    }
  }

  initForm () {
    this.smsForm = new FormGroup( {
      title: new FormControl( '', Validators.required ),
      template: new FormControl( '', Validators.required ),
      status: new FormControl( true, Validators.required ),
    } )
  }

  addSmsTemplates () {
    const payload: Update_Sms = {
      title: this.smsForm.value.title,
      template: this.smsForm.value.template,
      status: this.smsForm.value.status,
      id: this.data?.row?.id
    }
    if ( this.isEdit ) {
      this.store$.dispatch( new actions.UpdateSms( payload ) )
    } else {
      const payload: Create_Sms = {
        title: this.smsForm.value.title,
        template: this.smsForm.value.template,
        status: this.smsForm.value.status
      }
      this.store$.dispatch( new actions.CreateSms( payload ) )
    }
    this.dialogRef.close();
    this.smsForm.reset()
  }

  updateTemplateCount () {
    const templateValue = this.smsForm.get( 'template' )?.value;
    this.templateCount = templateValue ? templateValue.length : 0;
  }

  cancel () {
    this.dialogRef.close();
    this.smsForm.reset()
  }

}
