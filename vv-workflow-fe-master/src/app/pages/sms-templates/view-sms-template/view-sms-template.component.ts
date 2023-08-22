import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
  selector: 'vex-view-sms-template',
  templateUrl: './view-sms-template.component.html',
  styleUrls: [ './view-sms-template.component.scss' ]
} )
export class ViewSmsTemplateComponent implements OnInit {

  constructor (
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
  }

}
