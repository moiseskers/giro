import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerBiddingViewComponent} from './manager-bidding-view.component';

describe('ManagerBiddingViewComponent', () => {
  let component: ManagerBiddingViewComponent;
  let fixture: ComponentFixture<ManagerBiddingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBiddingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBiddingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
