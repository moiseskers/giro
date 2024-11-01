import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardBackyardPageComponent} from './dashboard-backyard-page.component';

describe('DashboardBackyardPageComponent', () => {
  let component: DashboardBackyardPageComponent;
  let fixture: ComponentFixture<DashboardBackyardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBackyardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBackyardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
