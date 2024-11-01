import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminBackyardDeclarationRequestListComponent} from './admin-backyard-declaration-request-list.component';

describe('MassListComponent', () => {
  let component: AdminBackyardDeclarationRequestListComponent;
  let fixture: ComponentFixture<AdminBackyardDeclarationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBackyardDeclarationRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBackyardDeclarationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
