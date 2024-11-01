import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceDocumentListContainerComponent} from './invoice-document-list-container.component';

describe('InvoiceDocumentListContainerComponent', () => {
  let component: InvoiceDocumentListContainerComponent;
  let fixture: ComponentFixture<InvoiceDocumentListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceDocumentListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDocumentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
