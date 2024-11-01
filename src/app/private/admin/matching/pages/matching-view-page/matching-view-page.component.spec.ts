import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingViewPageComponent} from './matching-view-page.component';

describe('MatchingViewPageComponent', () => {
  let component: MatchingViewPageComponent;
  let fixture: ComponentFixture<MatchingViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
