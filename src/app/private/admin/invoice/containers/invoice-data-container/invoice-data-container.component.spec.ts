import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceDataContainerComponent} from './invoice-data-container.component';

describe('InvoiceDataContainerComponent', () => {
  let component: InvoiceDataContainerComponent;
  let fixture: ComponentFixture<InvoiceDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceDataContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
