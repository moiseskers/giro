import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RejectedFormComponent} from './rejected-form.component';

describe('RejectedFormComponent', () => {
  let component: RejectedFormComponent;
  let fixture: ComponentFixture<RejectedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
