import { environment } from "src/environments/environment";

const baseUrl = environment.apiUrl;

const auth = `${ baseUrl }/api/auth`;
const property = `${ baseUrl }/api/property`;
const sms = `${ baseUrl }/api/sms`;
const email = `${ baseUrl }/api/email`;
const workflow = `${ baseUrl }/api/workflow`;
const action = `${ baseUrl }/api/action`;

export const auth_api_routes = {
  SIGNUP: `${ auth }/signup`,
  LOGIN: `${ auth }/login`,
  USER_INFO: `${ auth }/userInfo`,
  FORGOT_PASSWORD: `${ auth }/forgetPassword`,
  LOGOUT: `${ auth }/logout`,
  UPDATE_USER: `${ auth }/updateUser`,
  RESET_PASSWORD: `${ auth }/resetPassword`,
};

export const property_api_routes = {
  GET_PROPERTY: `${ property }/getProperties`,
  CREATE_PROPERTY: `${ property }/createProperties`,
  UPDATE_PROPERTY: `${ property }/updateProperties`,
  UPDATE_PROPERTY_STATUS: `${ property }/updatePropertyStatus`,
  DELETE_PROPERTY: `${ property }/deleteProperties`
}

export const sms_templates_api_routes = {
  GET_SMS_TEMPLATE: `${ sms }/getSmsTemplates`,
  CREATE_SMS_TEMPLATE: `${ sms }/createSmsTemplates`,
  UPDATE_SMS_TEMPLATE: `${ sms }/updateSmsTemplates`,
  DELETE_SMS_TEMPLATE: `${ sms }/deleteSmsTemplates`,
  UPDATE_SMS_TEMPLATE_STATUS: `${ sms }/updateStatus`
}

export const email_templates_api_routes = {
  GET_EMAIL_TEMPLATE: `${ email }/getEmailTemplates`,
  CREATE_EMAIL_TEMPLATE: `${ email }/createEmailTemplates`,
  UPDATE_EMAIL_TEMPLATE: `${ email }/updateEmailTemplates`,
  DELETE_EMAIL_TEMPLATE: `${ email }/deleteEmailTemplates`,
  UPDATE_EMAIL_TEMPLATE_STATUS: `${ email }/updateStatus`
}

export const workflow_api_routes = {
  GET_WORKFLOW: `${ workflow }/getworkflow`,
  CREATE_WORKFLOW: `${ workflow }/createworkflow`,
  UPDATE_WORKFLOW: `${ workflow }/updateworkflow`,
  DELETE_WORKFLOW: `${ workflow }/deleteworkflow`,
  UPDATE_WORKFLOW_STATUS: `${ workflow }/updateStatus`
}

export const action_api_routes = {
  GET_ACTION: `${ action }/getActions`,
}


