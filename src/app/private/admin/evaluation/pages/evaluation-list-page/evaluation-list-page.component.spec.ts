import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvaluationListPageComponent} from './evaluation-list-page.component';

describe('BiddingListComponent', () => {
  let component: EvaluationListPageComponent;
  let fixture: ComponentFixture<EvaluationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
