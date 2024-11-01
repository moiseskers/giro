import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalRepresentativeCreateComponent} from './legal-representative-create.component';

describe('LegalRepresentativeCreateComponent', () => {
  let component: LegalRepresentativeCreateComponent;
  let fixture: ComponentFixture<LegalRepresentativeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalRepresentativeCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalRepresentativeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
