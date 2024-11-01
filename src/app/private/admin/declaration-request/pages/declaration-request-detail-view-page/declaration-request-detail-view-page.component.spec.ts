import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestDetailViewPageComponent} from './declaration-request-detail-view-page.component';

describe('MassDetailPageComponent', () => {
  let component: DeclarationRequestDetailViewPageComponent;
  let fixture: ComponentFixture<DeclarationRequestDetailViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestDetailViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestDetailViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
