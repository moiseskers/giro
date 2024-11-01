import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerMaterialDocumentListContainerComponent
} from './industrial-consumer-material-document-list-container.component';

describe('MaterialDocumentListContainerComponent', () => {
  let component: IndustrialConsumerMaterialDocumentListContainerComponent;
  let fixture: ComponentFixture<IndustrialConsumerMaterialDocumentListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerMaterialDocumentListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerMaterialDocumentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
