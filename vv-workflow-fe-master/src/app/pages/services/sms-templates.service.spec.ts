import { TestBed } from '@angular/core/testing';

import { SmsTemplatesService } from './sms-templates.service';

describe('SmsTemplatesService', () => {
  let service: SmsTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
