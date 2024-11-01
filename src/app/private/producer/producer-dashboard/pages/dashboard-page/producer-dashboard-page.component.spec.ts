import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDashboardPageComponent} from './producer-dashboard-page.component';

describe('DashboardPageComponent', () => {
  let component: ProducerDashboardPageComponent;
  let fixture: ComponentFixture<ProducerDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerDashboardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
