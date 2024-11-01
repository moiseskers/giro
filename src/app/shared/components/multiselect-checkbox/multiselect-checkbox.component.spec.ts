import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiselectCheckboxComponent} from './multiselect-checkbox.component';

describe('MultiselectCheckboxComponent', () => {
  let component: MultiselectCheckboxComponent;
  let fixture: ComponentFixture<MultiselectCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
