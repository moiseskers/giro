import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegalRepresentativeListComponent} from './legal-representative-list.component';

describe('LegalRepresentativeComponent', () => {
  let component: LegalRepresentativeListComponent;
  let fixture: ComponentFixture<LegalRepresentativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalRepresentativeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalRepresentativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
