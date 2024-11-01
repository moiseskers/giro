import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppealOfferFormComponent} from './appeal-offer-form.component';

describe('DocumentFormComponent', () => {
  let component: AppealOfferFormComponent;
  let fixture: ComponentFixture<AppealOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealOfferFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
