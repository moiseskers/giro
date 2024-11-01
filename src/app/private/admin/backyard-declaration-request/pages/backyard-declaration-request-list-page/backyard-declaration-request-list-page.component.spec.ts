import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationRequestListPageComponent} from './backyard-declaration-request-list-page.component';

describe('BackyardDeclarationRequestListPageComponent', () => {
  let component: BackyardDeclarationRequestListPageComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationRequestListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
