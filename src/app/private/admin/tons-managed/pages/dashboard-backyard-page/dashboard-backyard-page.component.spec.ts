import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPatioTraseroPageComponent} from './dashboard-backyard-page.component';

describe('DashboardPatioTraseroComponent', () => {
  let component: DashboardPatioTraseroPageComponent;
  let fixture: ComponentFixture<DashboardPatioTraseroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPatioTraseroPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPatioTraseroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
