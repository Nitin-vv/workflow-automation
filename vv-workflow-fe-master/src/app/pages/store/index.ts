import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { AuthenticationEffects } from './auth/authentication.effect';
import { AuthenticationState } from './auth/authentication.state';
import { authenticationReducer } from './auth/authentication.reducer';
import { LocalStorageService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';
import { RouterStateUrl } from './router/router.state';
import { PropertyState } from './property/property.state';
import { PropertyEffects } from './property/property.effect';
import { PropertyService } from '../services/property.service';
import { propertyReducer } from './property/property.reducer';
import { SMSState } from './sms-template/sms.state';
import { SmsEffects } from './sms-template/sms.effect';
import { SMSReducer } from './sms-template/sms.reducer';
import { SmsTemplatesService } from '../services/sms-templates.service';
import { EmailEffects } from './email-templates/email.effect';
import { EmailState } from './email-templates/email.state';
import { EmailReducer } from './email-templates/email.reducer';
import { WorkflowState } from './workflow/workflow.state';
import { WorkflowEffects } from './workflow/workflow.effect';
import { WorkflowService } from '../services/workflow.service';
import { workflowReducer } from './workflow/workflow.reducer';
// import {RouterEffects} from './router/router.effect';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  authentication: AuthenticationState;
  property: PropertyState;
  sms: SMSState;
  email: EmailState
  workflow: WorkflowState
}

export const rootEffects: any[] = [
  // RouterEffects,
  AuthenticationEffects
];

export const effects: any[] = [
  AuthenticationEffects,
  PropertyEffects,
  SmsEffects,
  EmailEffects,
  WorkflowEffects
];

export const services: any[] = [
  LocalStorageService,
  AuthService,
  PropertyService,
  SmsTemplatesService,
  WorkflowService
];

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  authentication: authenticationReducer,
  property: propertyReducer,
  sms: SMSReducer,
  email: EmailReducer,
  workflow: workflowReducer
};
