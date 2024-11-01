import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceEditContainerComponent} from './invoice-edit-container.component';

describe('InvoiceEditContainerComponent', () => {
  let component: InvoiceEditContainerComponent;
  let fixture: ComponentFixture<InvoiceEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceEditContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
