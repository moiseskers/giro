import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppFilterV2Component} from './app-filter-v2.component';

describe('FooComponent', () => {
  let component: AppFilterV2Component;
  let fixture: ComponentFixture<AppFilterV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppFilterV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppFilterV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
