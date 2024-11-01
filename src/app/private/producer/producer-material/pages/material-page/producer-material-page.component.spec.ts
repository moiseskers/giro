import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerMaterialPageComponent} from './producer-material-page.component';

describe('DashboardPageComponent', () => {
  let component: ProducerMaterialPageComponent;
  let fixture: ComponentFixture<ProducerMaterialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerMaterialPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerMaterialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
