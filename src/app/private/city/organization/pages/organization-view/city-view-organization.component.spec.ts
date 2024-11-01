import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CityViewOrganizationComponent} from './city-view-organization.component';

describe('ViewEntitiesComponent', () => {
  let component: CityViewOrganizationComponent;
  let fixture: ComponentFixture<CityViewOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityViewOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityViewOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
