import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationDataComponent} from './organization-data.component';

describe('EntityDataComponent', () => {
  let component: OrganizationDataComponent;
  let fixture: ComponentFixture<OrganizationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
