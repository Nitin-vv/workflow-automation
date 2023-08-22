import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
  selector: 'vex-view-email-template',
  templateUrl: './view-email-template.component.html',
  styleUrls: [ './view-email-template.component.scss' ]
} )
export class ViewEmailTemplateComponent implements OnInit {

  constructor (
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
  }

}
