import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerMaterialDocumentListContainerComponent} from './producer-material-document-list-container.component';

describe('MaterialDocumentListContainerComponent', () => {
  let component: ProducerMaterialDocumentListContainerComponent;
  let fixture: ComponentFixture<ProducerMaterialDocumentListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerMaterialDocumentListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerMaterialDocumentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
