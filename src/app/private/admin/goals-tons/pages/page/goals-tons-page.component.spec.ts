import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GoalsTonsPageComponent} from './goals-tons-page.component';

describe('GoalsTonsPageComponent', () => {
  let component: GoalsTonsPageComponent;
  let fixture: ComponentFixture<GoalsTonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalsTonsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsTonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
