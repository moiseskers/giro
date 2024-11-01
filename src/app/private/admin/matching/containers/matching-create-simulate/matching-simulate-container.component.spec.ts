import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingSimulateContainerComponent} from './matching-simulate-container.component';

describe('MatchingCreateContainerComponent', () => {
  let component: MatchingSimulateContainerComponent;
  let fixture: ComponentFixture<MatchingSimulateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingSimulateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingSimulateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
