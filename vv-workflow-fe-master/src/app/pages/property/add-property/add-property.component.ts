import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Create_Property, Update_Property } from '../../shared/models/property.model';
import { AppState } from '../../store';
import * as actions from '../../store/property/property.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component( {
  selector: 'vex-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: [ './add-property.component.scss' ]
} )
export class AddPropertyComponent implements OnInit {
  checked: boolean = false;
  propertyForm!: FormGroup;
  isEdit: boolean = false;

  propertyType = [
    { id: 1, value: 'String' },
    { id: 2, value: 'Number' },
    { id: 3, value: 'Bigint' },
    { id: 4, value: 'Boolean' },
    { id: 5, value: 'Undefined' },
    { id: 6, value: 'Null' },
    { id: 7, value: 'Symbol' },
    { id: 8, value: 'Object' },
    { id: 9, value: 'Custom' },
  ]

  constructor (
    @Inject( MAT_DIALOG_DATA ) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: Dialog,
    private dialogRef: MatDialogRef<AddPropertyComponent>
  ) { }

  ngOnInit (): void {
    this.initForm();
    if ( this.data.isEdit ) {
      this.isEdit = true;
      this.propertyForm.patchValue( {
        title: this.data?.row?.title,
        type: Number( this.data?.row?.type ),
        status: this.data?.row?.status,
        regex: this.data?.row?.regex,
      } );
    }
  }

  initForm (): void {
    this.propertyForm = new FormGroup( {
      title: new FormControl( '', Validators.required ),
      type: new FormControl( '', Validators.required ),
      status: new FormControl( true ),
      regex: new FormControl( '' )
    } );
  }

  addProperty () {
    if ( this.isEdit ) {
      const payload: Update_Property = {
        id: this.data.row.id,
        title: this.propertyForm.value.title,
        type: this.propertyForm.value.type,
        status: this.propertyForm.value.status,
        regex: this.propertyForm.value.regex
      }
      this.store.dispatch( new actions.UpdateProperty( payload ) )
    } else {
      const payload: Create_Property = {
        title: this.propertyForm.value.title,
        type: this.propertyForm.value.type,
        status: this.propertyForm.value.status,
        regex: this.propertyForm.value.regex
      }
      this.store.dispatch( new actions.CreateProperty( payload ) );
    }
    this.dialogRef.close();
    this.propertyForm.reset()
  }

}
