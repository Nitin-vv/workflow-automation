import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component( {
  selector: 'vex-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: [ './email-action.component.scss' ]
} )
export class EmailActionComponent implements OnInit {
  output = new Subject<any>();
  @ViewChild( 'delay_action', { read: ViewContainerRef } ) delay_action: ViewContainerRef;
  @Input( 'data' ) data: any;
  @Input( 'id' ) id: any;
  @Output() delete = new EventEmitter<void>();
  constructor () { }

  ngOnInit (): void {
  }

  action ( data: any ) {
    let outputobj = {
      value: 'add_action',
      data: null,
      seq_id: data?.seq_id + 1
    }
    this.output.next( outputobj )
  }

  editAction ( data: any ) {
    let outputobj = {
      value: 'edit_action',
      data: data,
    }
    this.output.next( outputobj );
    this.delete.emit();
  }

  deleteaction ( data: any ) {
    let outputobj = {
      value: 'delete_action',
      data: data
    }
    this.output.next( outputobj )
  }

}
