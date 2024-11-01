import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestSuccessPageComponent} from './request-success-page.component';

describe('RequestSuccessPageComponent', () => {
  let component: RequestSuccessPageComponent;
  let fixture: ComponentFixture<RequestSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSuccessPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
