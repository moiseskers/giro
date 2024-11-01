import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationItemTableForm} from './backyard-declaration-item-table-form.component';

describe('TonsDeclarationTableFormComponent', () => {
  let component: BackyardDeclarationItemTableForm;
  let fixture: ComponentFixture<BackyardDeclarationItemTableForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationItemTableForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationItemTableForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
