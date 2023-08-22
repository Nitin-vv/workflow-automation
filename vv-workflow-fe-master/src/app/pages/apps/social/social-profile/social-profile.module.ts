import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialProfileRoutingModule } from './social-profile-routing.module';
import { SocialProfileComponent } from './social-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/pages/shared/material/shared.module';
import { SocialSettingComponent } from './social-setting/social-setting.component';


@NgModule({
  declarations: [SocialProfileComponent, SocialSettingComponent],
  exports: [
    SocialProfileComponent
  ],
  imports: [
    CommonModule,
    SocialProfileRoutingModule,
    MatIconModule,

    MatButtonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SocialProfileModule {
}
