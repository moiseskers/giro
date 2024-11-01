import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CigFormComponent} from './cig-form.component';

describe('CigFormComponent', () => {
  let component: CigFormComponent;
  let fixture: ComponentFixture<CigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
