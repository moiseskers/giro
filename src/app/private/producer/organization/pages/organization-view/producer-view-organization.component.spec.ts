import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerViewOrganizationComponent} from './producer-view-organization.component';

describe('ViewEntitiesComponent', () => {
  let component: ProducerViewOrganizationComponent;
  let fixture: ComponentFixture<ProducerViewOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerViewOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerViewOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
