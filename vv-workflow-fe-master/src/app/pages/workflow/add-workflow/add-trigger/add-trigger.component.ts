import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { CONDITION } from 'src/app/pages/enums/workflow.enum';
import { PropertyService } from 'src/app/pages/services/property.service';

@Component( {
  selector: 'vex-add-trigger',
  templateUrl: './add-trigger.component.html',
  styleUrls: [ './add-trigger.component.scss' ]
} )
export class AddTriggerComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @ViewChild( 'delay_action', { read: ViewContainerRef, static: true } ) delay_action: ViewContainerRef;
  @Input( 'id' ) id: any;
  @Output() delete = new EventEmitter<void>();

  triggerForm!: FormGroup
  edit: boolean = false;
  // save: boolean = false;
  output = new Subject<any>();
  formValue: any;
  Properties = [];
  total: number = 100;
  limit: number = 8;
  offset: number = 0;
  page: number = 1;
  isComplete$ = new BehaviorSubject<any>( false );
  options = new BehaviorSubject<any[]>( [] );
  options$ = this.options.asObservable();

  conditionList: Array<any> = [
    { id: 1, value: 'Equals' },
    { id: 2, value: 'Does not equal' },
    { id: 3, value: 'known' },
    { id: 4, value: 'unknown' },
  ];
  triggerConditionValue: any;
  triggerConditionBackendValue: any;
  updateData: boolean = false;

  constructor
    (
      @Inject( MAT_DIALOG_DATA ) public data: any,
      private propertyService: PropertyService,
      public dialogRef: MatDialogRef<AddTriggerComponent>,

    ) { }

  ngOnInit (): void {
    this.initializeForm();
    if ( this.data.isEdit ) {
      this.updateData = true;
      const trigger = this.data.data;
      this.triggerForm.patchValue( {
        property: trigger.triggerValue.property,
        condition: trigger.triggerValue.condition,
        conditionvalue: trigger.triggerValue.conditionvalue
      } );
    }
    this.getProperty();
  }

  getNextPropertyBatch () {
    if ( this.isComplete$.getValue() ) {
      return;
    }
    this.getProperty();
  }

  getProperty () {
    let payload = {
      search: '',
      order_by: 'createdAt',
      order_dir: 'desc',
      page: this.page,
      per_page: this.limit,
    }
    this.propertyService
      .getProperty( payload )
      .subscribe(
        ( res: any ) => {
          if ( res.data.length >= 1 ) {
            this.options.next( [
              ...this.options.getValue(),
              ...res.data,
            ] );
            this.page++;
            this.offset += this.limit;
          } else {
            this.isComplete$.next( true );
          }
        },
        () => {
          this.isComplete$.next( true );
        }
      );
  }

  initializeForm () {
    this.triggerForm = new FormGroup( {
      property: new FormControl( null, Validators.required ),
      condition: new FormControl( null, Validators.required ),
      conditionvalue: new FormControl( '' ),
    } );
  }

  saveTrigger () {
    this.formValue = this.triggerForm.value
    const property = this.triggerForm.value.property;
    let filteredProperties = []
    this.options$.subscribe( options => {
      filteredProperties = options.filter( item => item.id == property );
      const sourceFilter: Array<any> = this.conditionList.filter( ( s: { id: number, value: string } ) => s.id == this.triggerForm.value.condition );
      this.triggerConditionValue = sourceFilter[ 0 ].value;
      this.triggerConditionBackendValue = sourceFilter[ 0 ].id;
    } );

    let triggerObject = {};
    triggerObject = {
      property: filteredProperties[ 0 ],
      triggerValue: this.formValue,
      multivalue: [],
    }

    this.dialogRef.close( triggerObject );
    this.updateData = false;
  }

  editTrigger () { }


}
