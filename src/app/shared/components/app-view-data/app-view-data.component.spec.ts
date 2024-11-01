import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppViewDataComponent} from './app-view-data.component';

describe('AppViewDataComponent', () => {
  let component: AppViewDataComponent;
  let fixture: ComponentFixture<AppViewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppViewDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
