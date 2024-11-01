import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationDeclarationDataComponent} from './organization-declaration-data.component';

describe('RequestStatementDetailDataComponent', () => {
  let component: OrganizationDeclarationDataComponent;
  let fixture: ComponentFixture<OrganizationDeclarationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationDeclarationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationDeclarationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
