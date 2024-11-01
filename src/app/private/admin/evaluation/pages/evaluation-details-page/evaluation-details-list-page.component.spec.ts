import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvaluationDetailsListPageComponent} from './evaluation-details-list-page.component';

describe('BiddingListComponent', () => {
  let component: EvaluationDetailsListPageComponent;
  let fixture: ComponentFixture<EvaluationDetailsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationDetailsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationDetailsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
