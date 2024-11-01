import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationRequestFormComponent} from './backyard-declaration-request-form.component';

describe('RequestStatementFormComponent', () => {
  let component: BackyardDeclarationRequestFormComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
