import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RejectEvaluationFormComponent} from './reject-evaluation-form.component';

describe('RejectedFormComponent', () => {
  let component: RejectEvaluationFormComponent;
  let fixture: ComponentFixture<RejectEvaluationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectEvaluationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
