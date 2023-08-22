import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmailTemplateComponent } from './view-email-template.component';

describe('ViewEmailTemplateComponent', () => {
  let component: ViewEmailTemplateComponent;
  let fixture: ComponentFixture<ViewEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
