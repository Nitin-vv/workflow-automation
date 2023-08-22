import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './property.component';
import { MaterialModule } from '../shared/material/shared.module';
import { AddPropertyComponent } from './add-property/add-property.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";
import { BreadcrumbsModule } from "../../../@vex/components/breadcrumbs/breadcrumbs.module";

@NgModule( {
    declarations: [
        PropertyComponent,
        AddPropertyComponent,
        ViewPropertyComponent
    ],
    imports: [
        CommonModule,
        PropertyRoutingModule,
        MaterialModule,
        MatPaginatorModule,
        PageLayoutModule,
        BreadcrumbsModule
    ]
} )
export class PropertyModule { }
