import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { PropertyService } from '../services/property.service';
import { Delete_Property, Get_Property, Property, Update_Property_Status } from '../shared/models/property.model';
import { AppState } from '../store';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Filter, Meta, TablePagination } from '../shared/models/shared.model';
import { MatDrawer } from '@angular/material/sidenav';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { AddPropertyComponent } from './add-property/add-property.component';
import { MatDialog } from '@angular/material/dialog';
import { Property_Type } from '../enums/property.enum'
import * as deepEqual from 'deep-equal';
import {
  dataSelector,
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
} from '../store/property/property.selector';
import { initialState } from '../store/property/property.state';
import * as actions from '../../pages/store/property/property.actions';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { UntilDestroy } from '@ngneat/until-destroy';
import { UntypedFormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Customer } from '../apps/aio-table/interfaces/customer.model';

@UntilDestroy()
@Component( {
  selector: 'vex-property',
  templateUrl: './property.component.html',
  styleUrls: [ './property.component.scss' ],
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

export class PropertyComponent implements OnInit, OnDestroy, AfterViewInit {
  layoutCtrl = new UntypedFormControl('boxed');
  selection = new SelectionModel<Customer>(true, []);

  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( 'searchInput' ) searchInput: ElementRef;

  public properties$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public properties: Array<Property> = [];
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
  displayedColumns: string[] = [ 'id', 'title', 'type', 'status', 'createdAt', 'updatedAt', 'actions' ];
  private onDestroy$ = new Subject<void>();
  pageSize = 5;
  currentPage = 1;
  totalCount = 14;
  selectedIds: string[] = [];
  property = Property_Type;
  pageIndex = 0;
  showDelAllIcon:boolean = false;

  public sortKey: string;
  sortDirection: SortDirection = '';
  selectedProperties: number;
  constructor (
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private propertyService: PropertyService
  ) {
    this.filter$ = this.store$.select( filterSelector );
    this.meta$ = this.store$.select( metaSelector );
    this.properties$ = this.store$.select( dataSelector );
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

    this.properties$
      .pipe(
        debounceTime( 10 ),
        takeUntil( this.onDestroy$ ),
        tap( properties => {
          if ( !deepEqual( this.properties, properties ) ) {
            this.properties = properties;
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

  initFilter () {
    this.search = this.filter.search;
  }

  initMeta () {
    this.tablePagination.length = this.meta?.total;
    this.tablePagination.pageIndex = this.meta?.current_page - 1;
    this.tablePagination.pageSize = this.meta?.per_page;
  }

  loadData () {
    this.store$.dispatch( new actions.GetList( this.filter ) );
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

  selectAllProperties(event: MatCheckboxChange): void {
    const checkbox = event.source;
    const checked = checkbox.checked;
  
    this.selectedIds = [];

    if(this.properties.length > 0) {
      this.properties.forEach(row => {
        row.selected = checked;
    
        if (checked) {
          this.selectedIds.push(row.id.toString());
        }
      });
    
      this.selectedProperties = checked ? this.properties.length : 0;
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
  
    const allSelected = this.properties.every(row => row.selected);
    const headerCheckbox = document.querySelector('th.mat-header-cell mat-checkbox') as unknown as MatCheckbox;
    headerCheckbox.checked = allSelected;
    headerCheckbox.indeterminate = !allSelected && this.selectedIds.length > 0;
  
    this.showDelAllIcon = this.selectedIds.length > 0;
    this.selectedProperties = this.selectedIds.length;
  }
  

  onPaginateChange ( event ) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };

    this.updateFilter( data );
  }

  viewProperty ( row: any ) {
    this.dialog.open( ViewPropertyComponent, {
      width: '400px',
      height: '420px',
      disableClose: true,
      data: {
        isEdit: false,
        row: row
      }
    } )
  }

  addProperty () {
    this.dialog.open( AddPropertyComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true,
      data: {
        isEdit: false
      }
    } )
  }

  toggleStatus ( event: any, row: any ) {
    const payload: Update_Property_Status = {
      status: event.checked,
      id: row.id
    }
    this.store$.dispatch( new actions.UpdatePropertyStatus( payload ) );
  }


  editProperty ( row: any ) {
    this.dialog.open( AddPropertyComponent, {
      width: '400px',
      height: '420px',
      disableClose: true,
      data: {
        isEdit: true,
        row: row
      }
    } )
  }

  deleteProperty ( id: any ) { 
    const data: Delete_Property = {
      id: [ id ]
    }
    this.store$.dispatch( new actions.DeleteProperty( data.id ) );
    this.showDelAllIcon = false;
    this.selectedIds.length = 0
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
