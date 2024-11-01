import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessProfileComponent} from './process-profile.component';

describe('ProcessProfileComponent', () => {
  let component: ProcessProfileComponent;
  let fixture: ComponentFixture<ProcessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
