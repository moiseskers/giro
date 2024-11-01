import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDocumentCreateContainerComponent} from './backyard-document-create-container.component';

describe('CreateUserComponent', () => {
  let component: BackyardDocumentCreateContainerComponent;
  let fixture: ComponentFixture<BackyardDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
