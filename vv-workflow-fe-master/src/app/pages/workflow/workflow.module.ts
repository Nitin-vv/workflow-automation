import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { MaterialModule } from '../shared/material/shared.module';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';
import { AddTriggerComponent } from './add-workflow/add-trigger/add-trigger.component';
import { AddActionComponent } from './add-workflow/add-action/add-action.component';
import { TriggerActionComponent } from './add-workflow/actions/trigger-action/trigger-action.component';
import { EmailActionComponent } from './add-workflow/actions/email-action/email-action.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectInfiniteScrollDirective } from '../directives/mat-select-infinite-scroll.directive';
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";
import { BreadcrumbsModule } from "../../../@vex/components/breadcrumbs/breadcrumbs.module";

@NgModule( {
  declarations: [
    WorkflowComponent,
    AddWorkflowComponent,
    AddTriggerComponent,
    AddActionComponent,
    MatSelectInfiniteScrollDirective,
    TriggerActionComponent,
    EmailActionComponent
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    MaterialModule,
    DragDropModule,
    PageLayoutModule,
    BreadcrumbsModule
  ]
} )
export class WorkflowModule { }
