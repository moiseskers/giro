import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalRepresentativeEditComponent} from './legal-representative-edit.component';

describe('LegalRepresentativeEditComponent', () => {
  let component: LegalRepresentativeEditComponent;
  let fixture: ComponentFixture<LegalRepresentativeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalRepresentativeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalRepresentativeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
