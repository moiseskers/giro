import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationUserFormComponent} from './organization-user-form.component';

describe('UsersFormComponent', () => {
  let component: OrganizationUserFormComponent;
  let fixture: ComponentFixture<OrganizationUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUserFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
