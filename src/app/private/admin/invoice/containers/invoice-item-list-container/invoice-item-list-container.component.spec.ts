import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceItemListContainerComponent} from './invoice-item-list-container.component';

describe('InvoiceItemListContainerComponent', () => {
  let component: InvoiceItemListContainerComponent;
  let fixture: ComponentFixture<InvoiceItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
