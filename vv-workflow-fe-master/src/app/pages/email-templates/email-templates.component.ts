import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { TablePagination } from '../shared/models/shared.model';
import { Filter, Meta } from '../shared/models/email.model';
import { AppState } from '../store';
import { dataSelector, didFetchSelector, fetchingSelector, filterSelector, metaSelector } from '../store/email-templates/email.selector';
import { initialState } from '../store/email-templates/email.state';
import * as deepEqual from 'deep-equal';
import * as actions from '../../pages/store/email-templates/email.actions';
import { AddEmailTemplateComponent } from './add-email-template/add-email-template.component';
import { Email, Update_Email_Status } from '../shared/models/email.model';
import { ViewEmailTemplateComponent } from './view-email-template/view-email-template.component';
import { UntypedFormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Customer } from '../apps/aio-table/interfaces/customer.model';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

@Component( {
  selector: 'vex-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: [ './email-templates.component.scss' ],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})

export class EmailTemplatesComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');
  selection = new SelectionModel<Customer>(true, []);
  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( 'searchInput' ) searchInput: ElementRef;

  public email$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public email: Array<Email> = [];

  public filter: Filter = initialState.filter;
  public meta: Meta = initialState.meta;
  public search = '';
  public salespersonId: Number;
  public tablePagination: TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };
  private onDestroy$ = new Subject<void>();
  pageSize = 5;
  currentPage = 1;
  totalCount = 14;
  selectedEmailIds: number[] = [];
  pageIndex = 0;
  displayedColumns: string[] = [ 'id', 'title', 'subject', 'status', 'createdAt', 'updatedAt', 'actions' ];
  public sortKey: string;
  sortDirection: SortDirection = '';
  showDelAllIcon:boolean = false;
  selectedIds: string[] = [];
  selectedProperties: number;

  constructor (
    private dialog: MatDialog,
    private store$: Store<AppState>,
  ) {
    this.filter$ = this.store$.select( filterSelector );
    this.meta$ = this.store$.select( metaSelector );
    this.email$ = this.store$.select( dataSelector );
    this.didFetch$ = this.store$.select( didFetchSelector );
    this.fetching$ = this.store$.select( fetchingSelector );
  }
  ngAfterViewInit (): void {
    this.initData()
  }

  ngOnDestroy () {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit (): void {
    // this.initData()
  }

  initData () {
    fromEvent( this.searchInput.nativeElement, 'keyup' )
      .pipe(
        map( ( event: any ) => {
          return event.target.value;
        } ),
        filter( res => res.length > 2 || !res.length ),
        debounceTime( 500 ),
        distinctUntilChanged()
      )
      .subscribe( () => {
        this.onFilterChange();
      } );

    this.filter$
      .pipe(
        takeUntil( this.onDestroy$ ),
        tap( data => {
          if ( !deepEqual( this.filter, data ) ) {
            this.filter = data;
            this.initFilter();
          }
        } )
      )
      .subscribe();

    this.email$
      .pipe(
        debounceTime( 10 ),
        takeUntil( this.onDestroy$ ),
        tap( email => {
          if ( !deepEqual( this.email, email ) ) {
            this.email = email;
          }
        } )
      )
      .subscribe();

    this.meta$
      .pipe(
        takeUntil( this.onDestroy$ ),
        tap( meta => {
          if ( !deepEqual( this.meta, meta ) ) {
            this.meta = meta;
            this.initMeta();
          }
        } )
      )
      .subscribe();

    this.didFetch$
      .pipe(
        debounceTime( 10 ),
        takeUntil( this.onDestroy$ ),
        tap( didFetch => !didFetch && this.loadData() )
      )
      .subscribe();

  }

  selectAllProperties(event: MatCheckboxChange): void {
    const checkbox = event.source;
    const checked = checkbox.checked;
  
    this.selectedIds = [];
  
    if(this.email.length > 0) {
      this.email.forEach(row => {
        row.selected = checked;
    
        if (checked) {
          this.selectedIds.push(row.id.toString());
        }
      });
    
      this.selectedProperties = checked ? this.email.length : 0;
      this.showDelAllIcon = checked;
    }
  }

  selectProperty(row: any): void {
    row.selected = !row.selected;
  
    if (row.selected) {
      this.selectedIds.push(row.id.toString());
    } else {
      const index = this.selectedIds.indexOf(row.id.toString());
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  
    const allSelected = this.email.every(row => row.selected);
    const headerCheckbox = document.querySelector('th.mat-header-cell mat-checkbox') as unknown as MatCheckbox;
    headerCheckbox.checked = allSelected;
    headerCheckbox.indeterminate = !allSelected && this.selectedIds.length > 0;
  
    this.showDelAllIcon = this.selectedIds.length > 0;
    this.selectedProperties = this.selectedIds.length;
  }

  initFilter () {
    this.search = this.filter.search;
  }

  initMeta () {
    this.tablePagination.length = this.meta.total;
    this.tablePagination.pageIndex = this.meta.current_page - 1;
    this.tablePagination.pageSize = this.meta.per_page;
  }


  loadData () {
    this.store$.dispatch( new actions.GetEmailList( this.filter ) );
  }

  onFilterChange () {
    let data = {
      search: this.search,
      page: 1
    };
    this.updateFilter( data );
  }

  updateFilter ( data ) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch( new actions.UpdateFilter( updated_filter ) );
  }

  toggleStatus ( event: any, row: any ) {
    const payload: Update_Email_Status = {
      status: event.checked,
      id: row.id
    }
    this.store$.dispatch( new actions.UpdateStatus( payload ) );
  }

  deleteEmailTemplate ( id: any ) {
    this.store$.dispatch( new actions.DeleteEmail( id ) );
    this.selectedEmailIds = []
    this.showDelAllIcon = false;
    this.selectedIds.length = 0
  }

  viewEmailTemplate ( row: Email ) {
    this.dialog.open( ViewEmailTemplateComponent, {
      width: '500px',
      height: '520px',
      disableClose: true,
      data: {
        isView: true,
        row: row
      }
    } )
  }

  editEmailTemplate ( row: Email ) {
    this.dialog.open( AddEmailTemplateComponent, {
      width: '500px',
      height: '550px',
      disableClose: true,
      data: {
        isEdit: true,
        row: row
      }
    } )
  }

  addEmailTemplate () {
    this.dialog.open( AddEmailTemplateComponent, {
      width: '500px',
      height: '625px',
      disableClose: true,
      data: {
        isEdit: false
      }
    } )
  }

  applyFilter ( event: Event ) {
    const filterValue = ( event.target as HTMLInputElement ).value;
  }

  onPaginateChange ( event: any ) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };

    this.updateFilter( data );
  }

  sortData ( event ) {
    const updated_filter = {
      order_by: event.active ? event.active : initialState.filter.order_by,
      order_dir: event.direction
        ? event.direction
        : initialState.filter.order_dir,
    };
    this.store$.dispatch( new actions.UpdateFilter( updated_filter ) );
  }

}
