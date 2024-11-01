import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BiddingCreateComponent} from './bidding-create.component';

describe('EntityFormComponent', () => {
  let component: BiddingCreateComponent;
  let fixture: ComponentFixture<BiddingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
