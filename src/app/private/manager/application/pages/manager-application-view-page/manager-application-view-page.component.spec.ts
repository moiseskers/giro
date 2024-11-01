import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerApplicationViewPageComponent} from './manager-application-view-page.component';

describe('ManagerApplicationViewPageComponent', () => {
  let component: ManagerApplicationViewPageComponent;
  let fixture: ComponentFixture<ManagerApplicationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerApplicationViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerApplicationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
