import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppealOfferCreateComponent} from './appeal-offer-create.component';

describe('CreateUserComponent', () => {
  let component: AppealOfferCreateComponent;
  let fixture: ComponentFixture<AppealOfferCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealOfferCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealOfferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
