import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsTemplatesRoutingModule } from './sms-templates-routing.module';
import { SmsTemplatesComponent } from './sms-templates.component';
import { MaterialModule } from '../shared/material/shared.module';
import { AddSmsTemplateComponent } from './add-sms-template/add-sms-template.component';
import { ViewSmsTemplateComponent } from './view-sms-template/view-sms-template.component';
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";


@NgModule( {
    declarations: [
        SmsTemplatesComponent,
        AddSmsTemplateComponent,
        ViewSmsTemplateComponent
    ],
    imports: [
        CommonModule,
        SmsTemplatesRoutingModule,
        MaterialModule,
        PageLayoutModule
    ]
} )
export class SmsTemplatesModule { }
