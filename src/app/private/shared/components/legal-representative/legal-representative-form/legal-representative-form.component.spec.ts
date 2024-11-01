import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalRepresentativeFormComponent} from './legal-representative-form.component';

describe('LegalRepresentativeFormComponent', () => {
  let component: LegalRepresentativeFormComponent;
  let fixture: ComponentFixture<LegalRepresentativeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalRepresentativeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalRepresentativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
