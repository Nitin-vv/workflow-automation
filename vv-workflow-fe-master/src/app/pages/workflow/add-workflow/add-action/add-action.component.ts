import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject, filter } from 'rxjs';
import { ActionService } from 'src/app/pages/services/action.service';
import { EmailTemplatesService } from 'src/app/pages/services/email-templates.service';

@Component( {
  selector: 'vex-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: [ './add-action.component.scss' ]
} )
export class AddActionComponent implements OnInit {

  actionForm: FormGroup
  edit: boolean = false;
  save: boolean = false;
  output = new Subject<any>();
  @ViewChild( 'delay_action', { read: ViewContainerRef } ) delay_action: ViewContainerRef;
  @Input( 'id' ) id: any;
  @Output() delete = new EventEmitter<void>();

  total: number = 100;
  limit: number = 8;
  offset: number = 0;
  page: number = 1;

  isCompleteAction$ = new BehaviorSubject<any>( false );
  actionOptions = new BehaviorSubject<any[]>( [] );
  actionOptions$ = this.actionOptions.asObservable();

  isCompleteEmail$ = new BehaviorSubject<any>( false );
  emailOptions = new BehaviorSubject<any[]>( [] );
  emailOptions$ = this.emailOptions.asObservable();

  constructor
    (
      @Inject( MAT_DIALOG_DATA ) public data: any,
      private emailService: EmailTemplatesService,
      private actionService: ActionService,
      public dialogRef: MatDialogRef<AddActionComponent>,
    ) { }

  ngOnInit (): void {
    this.initializeForm()
    if ( this.data?.data ) {
      this.edit = true;
      this.actionForm.patchValue( {
        action: this.data?.data?.data?.action,
        email: this.data?.data?.data?.email
      } )
    }
    this.getEmailTemplates()
    this.getActions()
  }

  initializeForm () {
    this.actionForm = new FormGroup( {
      action: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required )
    } );
  }

  saveAction () {
    let actionObject = {};
    let emailListItem = [];
    this.emailOptions$.subscribe( options => {
      emailListItem = options.filter( item => item.id == this.actionForm.value.email );
    } );
    actionObject = {
      seq_id: this.data?.seq_id,
      name: 'Email Action',
      value: 'save_action',
      data: this.actionForm.value,
      actionName: this.actionForm.value.action,
      email: {
        id: emailListItem[ 0 ].id,
        title: emailListItem[ 0 ].title,
        body: emailListItem[ 0 ].body,
        subject: emailListItem[ 0 ].subject,
      },
    }
    this.dialogRef.close( actionObject );
    this.edit = false;
  }


  editAction () {
    this.save = false;
    // this.unfreezeFormFields()
  }

  cancelAction () {
    this.delete.emit();
  }

  addAction () {
    let outputobj = {
      value: 'add_action',
      data: null,
      container: this.delay_action,
      action_id: this.id,
      sequence_id: 1
    }
    this.output.next( outputobj )
  }

  onActionChange ( event: any ) {
    event.value
  }

  getNextActionBatch () {
    if ( this.isCompleteAction$.getValue() ) {
      return;
    }
    this.getActions()
  }

  getActions () {
    let payload = {
      search: '',
      order_by: 'createdAt',
      order_dir: 'desc',
      page: this.page,
      per_page: this.limit,
    }
    this.actionService
      .getActions( payload )
      .subscribe(
        ( res: any ) => {
          if ( res.data.length >= 1 ) {
            this.actionOptions.next( [
              ...this.actionOptions.getValue(),
              ...res.data,
            ] );
            this.page++;
            this.offset += this.limit;
          } else {
            this.isCompleteAction$.next( true );
          }
        },
        () => {
          this.isCompleteAction$.next( true );
        }
      );
  }

  getNextEmailBatch () {
    if ( this.isCompleteEmail$.getValue() ) {
      return;
    }
    this.getEmailTemplates()
  }

  getEmailTemplates () {
    let payload = {
      search: '',
      order_by: 'createdAt',
      order_dir: 'desc',
      page: this.page,
      per_page: this.limit,
    }
    this.emailService
      .getEmailTemplates( payload )
      .subscribe(
        ( res: any ) => {
          if ( res.data.length >= 1 ) {
            this.emailOptions.next( [
              ...this.emailOptions.getValue(),
              ...res.data,
            ] );
            this.page++;
            this.offset += this.limit;
          } else {
            this.isCompleteEmail$.next( true );
          }
        },
        () => {
          this.isCompleteEmail$.next( true );
        }
      );
  }

}
