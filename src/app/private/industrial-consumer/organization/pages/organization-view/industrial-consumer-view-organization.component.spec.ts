import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndustrialConsumerViewOrganizationComponent} from './industrial-consumer-view-organization.component';

describe('ViewEntitiesComponent', () => {
  let component: IndustrialConsumerViewOrganizationComponent;
  let fixture: ComponentFixture<IndustrialConsumerViewOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrialConsumerViewOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerViewOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
