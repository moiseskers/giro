import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialDocumentListComponent} from './material-document-list.component';

describe('MaterialDocumentListContainerComponent', () => {
  let component: MaterialDocumentListComponent;
  let fixture: ComponentFixture<MaterialDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDocumentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
