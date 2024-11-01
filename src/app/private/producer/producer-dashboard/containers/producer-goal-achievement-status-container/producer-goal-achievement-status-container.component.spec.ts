import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerGoalAchievementStatusContainerComponent} from './producer-goal-achievement-status-container.component';

describe('GoalAchievementStatusContainerComponent', () => {
  let component: ProducerGoalAchievementStatusContainerComponent;
  let fixture: ComponentFixture<ProducerGoalAchievementStatusContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerGoalAchievementStatusContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerGoalAchievementStatusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
