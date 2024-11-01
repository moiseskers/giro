import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionAndAnswersFormComponent} from './question-and-answers-form.component';

describe('GeneralInformationComponent', () => {
  let component: QuestionAndAnswersFormComponent;
  let fixture: ComponentFixture<QuestionAndAnswersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAndAnswersFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionAndAnswersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
