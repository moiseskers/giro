import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvaluationViewComponent} from './evaluation-view.component';

describe('ViewEntitiesComponent', () => {
  let component: EvaluationViewComponent;
  let fixture: ComponentFixture<EvaluationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
