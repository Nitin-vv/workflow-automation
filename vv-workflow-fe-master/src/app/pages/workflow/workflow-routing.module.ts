import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';

const routes: Routes = [
  { path: '', component: WorkflowComponent },
  { path: 'add-workflow', component: AddWorkflowComponent },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class WorkflowRoutingModule { }
