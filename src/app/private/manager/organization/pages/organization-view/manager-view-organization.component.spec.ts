import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerViewOrganizationComponent} from './manager-view-organization.component';

describe('ViewEntitiesComponent', () => {
  let component: ManagerViewOrganizationComponent;
  let fixture: ComponentFixture<ManagerViewOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerViewOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerViewOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
