import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmitOfferFormComponent} from './submit-offer-form.component';

describe('DocumentFormComponent', () => {
  let component: SubmitOfferFormComponent;
  let fixture: ComponentFixture<SubmitOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitOfferFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
