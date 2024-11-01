import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingCreateContainerComponent} from './matching-create-container.component';

describe('MatchingCreateContainerComponent', () => {
  let component: MatchingCreateContainerComponent;
  let fixture: ComponentFixture<MatchingCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
