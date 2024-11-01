import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingDataComponent} from './matching-data.component';

describe('MatchingDataComponent', () => {
  let component: MatchingDataComponent;
  let fixture: ComponentFixture<MatchingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
