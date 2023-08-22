import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component( {
  selector: 'vex-trigger-action',
  templateUrl: './trigger-action.component.html',
  styleUrls: [ './trigger-action.component.scss' ]
} )
export class TriggerActionComponent implements OnInit {
  @Input( 'triggers' ) triggers: any;
  output = new Subject<any>();

  constructor () { }

  ngOnInit () { }

  action () {
    let outputobj = {
      value: 'add_action',
      data: null,
      seq_id: 0
    }
    this.output.next( outputobj )
  }

  onAddcondition ( $condition, triggerType, index ) {
    let outputobj = {
      value: 'add_contidion',
      data: { condtion: $condition, triggertype: triggerType, arrayindex: index },
    }
    this.output.next( outputobj )
  }

  deleteTrigger ( level: number, index: number ) {
    let outputobj = {
      value: 'delete_condition',
      data: { level: level, index: index },
    }
    this.output.next( outputobj )
  }

  editTrigger ( triggerCondition: any, level: number, index: number ) {
    let outputobj = {
      value: 'edit_condition',
      data: { level: level, index: index, triggerCondition: triggerCondition }
    }
    this.output.next( outputobj )
  }
}
