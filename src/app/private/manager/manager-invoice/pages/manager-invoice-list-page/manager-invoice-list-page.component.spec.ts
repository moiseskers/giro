import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerInvoiceListPageComponent} from './manager-invoice-list-page.component';

describe('ManagerInvoiceListPageComponent', () => {
  let component: ManagerInvoiceListPageComponent;
  let fixture: ComponentFixture<ManagerInvoiceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerInvoiceListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerInvoiceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
