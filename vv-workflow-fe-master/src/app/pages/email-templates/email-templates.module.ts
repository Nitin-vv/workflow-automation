import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplatesRoutingModule } from './email-templates-routing.module';
import { EmailTemplatesComponent } from './email-templates.component';
import { AddEmailTemplateComponent } from './add-email-template/add-email-template.component';
import { MaterialModule } from '../shared/material/shared.module';
import { ViewEmailTemplateComponent } from './view-email-template/view-email-template.component';
import { QuillModule } from 'ngx-quill';
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";

@NgModule( {
    declarations: [
        EmailTemplatesComponent,
        AddEmailTemplateComponent,
        ViewEmailTemplateComponent
    ],
    imports: [
        CommonModule,
        EmailTemplatesRoutingModule,
        MaterialModule,
        QuillModule.forRoot(),
        PageLayoutModule
    ]
} )
export class EmailTemplatesModule { }
