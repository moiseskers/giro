import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceDocumentCreateContainerComponent} from './invoice-document-create-container.component';

describe('InvoiceDocumentCreateContainerComponent', () => {
  let component: InvoiceDocumentCreateContainerComponent;
  let fixture: ComponentFixture<InvoiceDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
