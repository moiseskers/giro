import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestFormComponent} from './declaration-request-form.component';

describe('RequestStatementFormComponent', () => {
  let component: DeclarationRequestFormComponent;
  let fixture: ComponentFixture<DeclarationRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
