import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentCreateComponent} from './document-create.component';

describe('CreateUserComponent', () => {
  let component: DocumentCreateComponent;
  let fixture: ComponentFixture<DocumentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
