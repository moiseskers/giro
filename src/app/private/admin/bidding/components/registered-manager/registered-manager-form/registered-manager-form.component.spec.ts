import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisteredManagerFormComponent} from './registered-manager-form.component';

describe('DocumentFormComponent', () => {
  let component: RegisteredManagerFormComponent;
  let fixture: ComponentFixture<RegisteredManagerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredManagerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
