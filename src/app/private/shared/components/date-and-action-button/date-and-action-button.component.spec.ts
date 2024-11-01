import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateAndActionButtonComponent} from './date-and-action-button.component';

describe('DateAndActionButtonComponent', () => {
  let component: DateAndActionButtonComponent;
  let fixture: ComponentFixture<DateAndActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateAndActionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateAndActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
