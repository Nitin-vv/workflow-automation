import { ChangeDetectorRef, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddSmsTemplateComponent } from '../../sms-templates/add-sms-template/add-sms-template.component';
import { SmsTemplatesComponent } from '../../sms-templates/sms-templates.component';
import { EmailTemplatesComponent } from '../../email-templates/email-templates.component';
import { AddTriggerComponent } from './add-trigger/add-trigger.component';
import { AddActionComponent } from './add-action/add-action.component';
import { EmailActionComponent } from './actions/email-action/email-action.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as actions from '../../store/workflow/workflow.actions';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TriggerActionComponent } from './actions/trigger-action/trigger-action.component';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Workflow } from '../../shared/models/workflow.model';
import { dataSelector } from '../../store/workflow/workflow.selector';
import * as deepEqual from 'deep-equal';

@Component( {
  selector: 'vex-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: [ './add-workflow.component.scss' ]
} )
export class AddWorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild( 'container', { read: ViewContainerRef } ) container: ViewContainerRef;
  triggers: any[] = [];
  actions: any[] = [];
  obj: any = {
    triggers: [],
    actions: []
  };
  edit: boolean = false;
  workflow_data: any;
  workflow_Id: any;
  public workflow$: Observable<any>;
  public workflow: Array<Workflow> = [];
  private onDestroy$ = new Subject<void>();

  constructor (
    private componentFactoryResolver: ComponentFactoryResolver,
    private _cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private store$: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.workflow$ = this.store$.select( dataSelector );
  }

  ngOnInit () { }

  ngAfterViewInit () {
    this.route.queryParams.subscribe( ( params ) => {
      this.workflow$
        .pipe(
          // debounceTime( 10 ),
          takeUntil( this.onDestroy$ ),
          tap( workflow => {
            if ( !deepEqual( this.workflow, workflow ) ) {
              this.workflow = workflow;
            }
          } )
        )
        .subscribe();
      let filteredWorkflow = this.workflow.filter( x => x.id == params.id )
      if ( filteredWorkflow.length > 0 ) {
        this.edit = true;
        this.workflow_Id = filteredWorkflow[ 0 ]?.id;
        this.workflow_data = JSON.parse( filteredWorkflow[ 0 ]?.workflow );
        this.triggers = this.workflow_data.triggers;
        this.actions = this.workflow_data.actions;
        this.obj.triggers = this.triggers;
        this.obj.actions = this.actions;
        this.generateWorkflow( this.workflow_data );
      }
    } );
  }

  generateWorkflow ( jsonData: any ) {
    this.container?.clear();
    if ( jsonData.triggers ) {
      this.trigger( jsonData.triggers );
    }
    if ( jsonData.actions ) {
      jsonData.actions.forEach( ( element ) => {
        this.renderActions( element, null );
      } );
    }
  }

  renderActions ( action: any, containerRef: any ) {
    if ( action.name === 'Email Action' ) {
      this.addEmailAction( action, !containerRef ? this.container : containerRef );
      containerRef = null;
    }
  }

  addEmailAction ( data?: any, container?: any ) {
    if ( !container || typeof container.createComponent !== 'function' ) {
      return null;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory( EmailActionComponent );
    const componentRef = container.createComponent( componentFactory );
    componentRef?.instance?.delete?.subscribe( () => {
      componentRef.destroy();
    } );
    componentRef.instance.data = data;
    componentRef.instance.output.subscribe( ( results ) => {
      switch ( results.value ) {
      case 'add_action':
        this.action( results.seq_id );
        break;
      case 'delete_action':
        this.deleteEmailAction( results.data );
        break;
      case 'edit_action':
        this.editAction( results.data );
        break;
      default:
        break;
      }
    } );
    this._cdr.detectChanges();
    return componentRef;
  }

  trigger ( data?: any ) {
    if ( data.length <= 1 ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory( TriggerActionComponent );
      const componentRef = this.container.createComponent( componentFactory );
      componentRef.instance.triggers = data;
      componentRef.instance.output.subscribe( ( results ) => {
        switch ( results.value ) {
        case 'add_action':
          this.action( results.seq_id );
          break;
        case 'add_contidion':
          // this.onAddcondition(results.data.condtion, results.data.triggertype, results.data.arrayindex);
          break;
        case 'delete_condition':
          this.deleteTriggerCondition( results.data );
          break;
        case 'edit_condition':
          this.editTriggerCondition( results.data.triggerCondition, results.data.level, results.data.index );
          break;
        default:
          break;
        }
      } );
      this._cdr.detectChanges();
      return componentRef;
    }
  }

  addTrigger ( conditions?: any, conditionval?: any, triggerindex?: any ) {
    const title = 'Create Trigger';
    const dialogRef: MatDialogRef<any> = this.dialog.open( AddTriggerComponent, {
      width: '400px',
      maxHeight: '450px',
      disableClose: true,
      data: { title: title, conditionval: conditionval, isEdit: false },
    } );
    dialogRef.afterClosed().subscribe( ( res ) => {
      if ( res != null && res != '' && res != undefined ) {
        this.triggers.push( res );
        this.obj.triggers = this.triggers;
        this.generateWorkflow( this.obj );
        this._cdr.detectChanges();
      }
    } );
  }

  editTriggerCondition ( triggerCondition: any, level: number, index: number ) {
    const title = 'Edit Trigger';
    const dialogRef: MatDialogRef<any> = this.dialog.open( AddTriggerComponent, {
      width: '400px',
      maxHeight: '450px',
      disableClose: true,
      data: { title: title, data: triggerCondition, isEdit: true },
    } );
    dialogRef.afterClosed().subscribe( ( res ) => {
      if ( res != null ) {
        if ( level === 0 ) {
          res[ 'multivalue' ] = this.triggers[ index ].multivalue;
          this.triggers[ index ] = res;
        } else {
          this.triggers[ 0 ].multivalue[ index ] = res;
        }
        this.obj.triggers = this.triggers;
        this.obj.actions = this.actions;
        this.generateWorkflow( this.obj );
        this._cdr.detectChanges();
      }
    } );
  }

  deleteTriggerCondition ( data: any ) {
    this.triggers = [];
    this.obj.triggers = [];
    this.generateWorkflow( this.obj );
  }

  action ( seq_id?: number ) {
    const title = 'Choose an action';
    const dialogRef: MatDialogRef<any> = this.dialog.open( AddActionComponent, {
      width: '400px',
      maxHeight: '450px',
      disableClose: true,
      data: { title: title, seq_id: seq_id },
    } );
    dialogRef.afterClosed().subscribe( ( res ) => {
      if ( res != null ) {
        let maxSeqId = Math.max( ...this.actions.map( obj => obj.seq_id ) );
        let inserted = false;

        this.actions = this.actions.reduce( ( result, obj ) => {
          if ( obj.seq_id === res.seq_id ) {
            inserted = true;
            result.push( res );
          }
          result.push( obj );
          return result;
        }, [] );

        if ( !inserted ) {
          this.actions.splice( res.seq_id, 0, res );
        }

        this.actions = this.actions.map( obj => {
          if ( obj.seq_id >= res.seq_id && obj !== res ) {
            obj.seq_id++;
          }
          return obj;
        } );
        this.obj.actions = this.actions;
        this.generateWorkflow( this.obj );
        this._cdr.detectChanges();
      }
    } );
  }

  editAction ( data?: any, child_container?: any, response_parent?: any, sequence_id?: number, action_name?: string, child_containerName?: any ) {
    const title = 'Edit Action';
    const dialogRef: MatDialogRef<any> = this.dialog.open( AddActionComponent, {
      width: '400px',
      maxHeight: '450px',
      disableClose: true,
      data: { title: title, data: data },
    } );
    dialogRef.afterClosed().subscribe( ( res ) => {
      if ( res != null ) {
        if ( res.seq_id >= 0 ) {
          const index = this.actions.findIndex( ( x: any ) => x.seq_id == res.seq_id );
          this.actions[ index ] = res;
        } else {
          this.actions.push( res );
        }
        this.obj.actions = this.actions;
        this.generateWorkflow( this.obj );
        this._cdr.detectChanges();
      }
    } );
  }

  deleteEmailAction ( data: any ) {
    const index = this.actions.findIndex( ( x: any ) => x.seq_id === data?.seq_id );
    this.actions.splice( index, 1 );
    // Decrease seq_id by 1 for the objects that come after the deleted object
    for ( let i = index; i < this.actions.length; i++ ) {
      this.actions[ i ].seq_id -= 1;
    }
    this.obj.actions = this.actions;
    this.generateWorkflow( this.obj );
  }

  saveWorkflow () {
    const payload = {
      title: 'test',
      status: 0,
      workflows: JSON.stringify( this.obj ),
    };
    this.store$.dispatch( new actions.CreateWorkflow( payload ) );
    this.edit = true;
    this.router.navigateByUrl( '/workflows' );
  }

  updateWorkflow () {
    const payload = {
      id: this.workflow_Id,
      title: 'test',
      status: 0,
      workflows: JSON.stringify( this.obj ),
    };
    this.store$.dispatch( new actions.UpdateWorkflow( payload ) );
  }
  private zoomFactor = 1;
  private zoomWrapper: HTMLElement | null = null;
  private containerPosition = { top: 0, left: 0 };
  private boundaryElement: HTMLElement | null = null;
  private minZoomFactor = 0.5;
  private maxZoomFactor = 2;

  zoomIn (): void {
    if ( this.zoomFactor < this.maxZoomFactor ) {
      this.zoomFactor += 0.1;
      this.updateZoom();
    }
  }

  zoomOut (): void {
    if ( this.zoomFactor > this.minZoomFactor ) {
      this.zoomFactor -= 0.1;
      this.updateZoom();
    }
  }

  resetZoom (): void {
    this.zoomFactor = 1;
    this.updateZoom();
  }

  private updateZoom (): void {
    const container = this.elementRef.nativeElement.querySelector( '.example-boundary .cdkDrag' );
    if ( container instanceof HTMLElement ) {
      if ( !this.zoomWrapper ) {
        // Create a wrapper element if it doesn't exist
        this.zoomWrapper = document.createElement( 'div' );
        this.zoomWrapper.classList.add( 'zoom-wrapper' );
        container.parentNode.insertBefore( this.zoomWrapper, container );
        this.zoomWrapper.appendChild( container );
      }

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scaledContainerWidth = containerWidth * this.zoomFactor;
      const scaledContainerHeight = containerHeight * this.zoomFactor;

      // Calculate the maximum top and left positions based on the boundary and zoom factor
      let maxTop = 0;
      let maxLeft = 0;

      if ( this.boundaryElement ) {
        maxTop = this.boundaryElement.clientHeight - scaledContainerHeight;
        maxLeft = this.boundaryElement.clientWidth - scaledContainerWidth;
      }

      // Adjust the container position based on the changes in dimensions after zooming
      this.containerPosition.top = Math.max( Math.min( this.containerPosition.top, 0 ), maxTop );
      this.containerPosition.left = Math.max( Math.min( this.containerPosition.left, 0 ), maxLeft );

      // Apply the updated container position and scale to the wrapper element
      this.zoomWrapper.style.top = `${ this.containerPosition.top }px`;
      this.zoomWrapper.style.left = `${ this.containerPosition.left }px`;
      this.zoomWrapper.style.transform = `scale(${ this.zoomFactor })`;
      this.zoomWrapper.style.transformOrigin = 'top left';
    }
  }


}
