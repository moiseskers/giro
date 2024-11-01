import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmitOfferCreateComponent} from './submit-offer-create.component';

describe('CreateUserComponent', () => {
  let component: SubmitOfferCreateComponent;
  let fixture: ComponentFixture<SubmitOfferCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitOfferCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitOfferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
