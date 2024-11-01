import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceItemTableForm} from './invoice-item-table-form.component';

describe('TonsDeclarationTableFormComponent', () => {
  let component: InvoiceItemTableForm;
  let fixture: ComponentFixture<InvoiceItemTableForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceItemTableForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceItemTableForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
