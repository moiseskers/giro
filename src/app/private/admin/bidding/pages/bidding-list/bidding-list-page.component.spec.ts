import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BiddingListPageComponent} from './bidding-list-page.component';

describe('BiddingListComponent', () => {
  let component: BiddingListPageComponent;
  let fixture: ComponentFixture<BiddingListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
