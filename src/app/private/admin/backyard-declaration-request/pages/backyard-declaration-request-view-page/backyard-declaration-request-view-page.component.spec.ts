import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationRequestViewPageComponent} from './backyard-declaration-request-view-page.component';

describe('BackyardDeclarationRequestViewPageComponent', () => {
  let component: BackyardDeclarationRequestViewPageComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationRequestViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
