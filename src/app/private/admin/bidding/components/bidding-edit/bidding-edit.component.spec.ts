import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BiddingEditComponent} from './bidding-edit.component';

describe('BranchesEditComponent', () => {
  let component: BiddingEditComponent;
  let fixture: ComponentFixture<BiddingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
