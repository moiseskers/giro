import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerInvoiceDocumentCreateContainerComponent} from './manager-invoice-document-create-container.component';

describe('InvoiceDocumentCreateContainerComponent', () => {
  let component: ManagerInvoiceDocumentCreateContainerComponent;
  let fixture: ComponentFixture<ManagerInvoiceDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerInvoiceDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerInvoiceDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
