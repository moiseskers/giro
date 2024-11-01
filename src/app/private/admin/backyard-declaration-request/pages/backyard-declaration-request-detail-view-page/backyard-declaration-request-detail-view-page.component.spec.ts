import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    BackyardDeclarationRequestDetailViewPageComponent
} from './backyard-declaration-request-detail-view-page.component';

describe('BackyardDeclarationRequestDetailViewPageComponent', () => {
  let component: BackyardDeclarationRequestDetailViewPageComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestDetailViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationRequestDetailViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestDetailViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
