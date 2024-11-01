import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialDocumentFormComponent} from './material-document-form.component';

describe('MaterialDocumentFormComponent', () => {
  let component: MaterialDocumentFormComponent;
  let fixture: ComponentFixture<MaterialDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDocumentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
