import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceCreateContainerComponent} from './invoice-create-container.component';

describe('InvoiceCreateContainerComponent', () => {
  let component: InvoiceCreateContainerComponent;
  let fixture: ComponentFixture<InvoiceCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
