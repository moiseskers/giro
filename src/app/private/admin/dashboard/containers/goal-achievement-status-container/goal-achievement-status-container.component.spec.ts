import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GoalAchievementStatusContainerComponent} from './goal-achievement-status-container.component';

describe('GoalAchievementStatusContainerComponent', () => {
  let component: GoalAchievementStatusContainerComponent;
  let fixture: ComponentFixture<GoalAchievementStatusContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalAchievementStatusContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalAchievementStatusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
