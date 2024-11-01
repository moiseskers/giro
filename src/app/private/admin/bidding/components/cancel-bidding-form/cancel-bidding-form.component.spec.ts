import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CancelBiddingFormComponent} from './cancel-bidding-form.component';

describe('RejectedFormComponent', () => {
  let component: CancelBiddingFormComponent;
  let fixture: ComponentFixture<CancelBiddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelBiddingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelBiddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
