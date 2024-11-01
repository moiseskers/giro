import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationUserEditComponent} from './organization-user-edit.component';

describe('UserEditComponent', () => {
  let component: OrganizationUserEditComponent;
  let fixture: ComponentFixture<OrganizationUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUserEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
