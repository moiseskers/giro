import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationRequestListComponent} from './backyard-declaration-request-list.component';

describe('BackyardDeclarationRequestListComponent', () => {
  let component: BackyardDeclarationRequestListComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
