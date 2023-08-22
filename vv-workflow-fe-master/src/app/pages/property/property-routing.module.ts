import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyComponent } from './property.component';

const routes: Routes = [
  { path: '', component: PropertyComponent },
  { path: 'add-property', component: AddPropertyComponent }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class PropertyRoutingModule { }
