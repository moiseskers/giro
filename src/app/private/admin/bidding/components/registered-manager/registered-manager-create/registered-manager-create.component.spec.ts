import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisteredManagerCreateComponent} from './registered-manager-create.component';

describe('CreateUserComponent', () => {
  let component: RegisteredManagerCreateComponent;
  let fixture: ComponentFixture<RegisteredManagerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredManagerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredManagerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
