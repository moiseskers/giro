import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerInformationComponent} from './manager-information.component';

describe('GeneralInformationComponent', () => {
  let component: ManagerInformationComponent;
  let fixture: ComponentFixture<ManagerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
