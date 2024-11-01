import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerDocumentCreateContainerComponent
} from './industrial-consumer-document-create-container.component';

describe('IndustrialConsumerDocumentCreateContainerComponent', () => {
  let component: IndustrialConsumerDocumentCreateContainerComponent;
  let fixture: ComponentFixture<IndustrialConsumerDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
