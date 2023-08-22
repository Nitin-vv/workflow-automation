import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property_Type } from '../../enums/property.enum';

@Component( {
  selector: 'vex-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: [ './view-property.component.scss' ]
} )
export class ViewPropertyComponent implements OnInit {
  property = Property_Type;

  constructor (
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
  }

}
