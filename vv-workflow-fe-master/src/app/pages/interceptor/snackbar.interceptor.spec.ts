import { TestBed } from '@angular/core/testing';

import { SnackbarInterceptor } from './snackbar.interceptor';

describe('SnackbarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SnackbarInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SnackbarInterceptor = TestBed.inject(SnackbarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
