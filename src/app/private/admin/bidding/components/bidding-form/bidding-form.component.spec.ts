import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BiddingFormComponent} from './bidding-form.component';

describe('EntityFormComponent', () => {
  let component: BiddingFormComponent;
  let fixture: ComponentFixture<BiddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
