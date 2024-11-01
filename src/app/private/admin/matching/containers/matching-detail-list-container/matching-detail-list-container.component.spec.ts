import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingDetailListContainerComponent} from './matching-detail-list-container.component';

describe('MatchingDetailListContainerComponent', () => {
  let component: MatchingDetailListContainerComponent;
  let fixture: ComponentFixture<MatchingDetailListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingDetailListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingDetailListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
