import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationUserCreateComponent} from './organization-user-create.component';

describe('CreateUserComponent', () => {
  let component: OrganizationUserCreateComponent;
  let fixture: ComponentFixture<OrganizationUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUserCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
