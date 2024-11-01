import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BiddingViewComponent} from './bidding-view.component';

describe('ViewEntitiesComponent', () => {
  let component: BiddingViewComponent;
  let fixture: ComponentFixture<BiddingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
