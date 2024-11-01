import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndustrialConsumerMaterialPageComponent} from './industrial-consumer-material-page.component';

describe('DashboardPageComponent', () => {
  let component: IndustrialConsumerMaterialPageComponent;
  let fixture: ComponentFixture<IndustrialConsumerMaterialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerMaterialPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerMaterialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
