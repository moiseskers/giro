import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialDocumentCreateContainerComponent} from './material-document-create-container.component';

describe('MaterialDocumentListContainerComponent', () => {
  let component: MaterialDocumentCreateContainerComponent;
  let fixture: ComponentFixture<MaterialDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
