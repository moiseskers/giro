import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerBiddingListPageComponent} from './manager-bidding-list-page.component';

describe('BiddingListComponent', () => {
  let component: ManagerBiddingListPageComponent;
  let fixture: ComponentFixture<ManagerBiddingListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBiddingListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBiddingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
