import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialDocumentListContainerComponent} from './material-document-list-container.component';

describe('MaterialDocumentListContainerComponent', () => {
  let component: MaterialDocumentListContainerComponent;
  let fixture: ComponentFixture<MaterialDocumentListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDocumentListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialDocumentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
