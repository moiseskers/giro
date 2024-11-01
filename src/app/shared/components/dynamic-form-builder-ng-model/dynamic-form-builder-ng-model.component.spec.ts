import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormBuilderNgModelComponent} from './dynamic-form-builder-ng-model.component';

describe('DynamicFormBuilderNgModelComponent', () => {
  let component: DynamicFormBuilderNgModelComponent;
  let fixture: ComponentFixture<DynamicFormBuilderNgModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormBuilderNgModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormBuilderNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
