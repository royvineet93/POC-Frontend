import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotconfirmationComponent } from './forgotconfirmation.component';

describe('ForgotconfirmationComponent', () => {
  let component: ForgotconfirmationComponent;
  let fixture: ComponentFixture<ForgotconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
