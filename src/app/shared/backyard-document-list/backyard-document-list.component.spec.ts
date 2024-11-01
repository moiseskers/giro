import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDocumentListComponent} from './backyard-document-list.component';

describe('IndustrialConsumerDocumentListComponent', () => {
  let component: BackyardDocumentListComponent;
  let fixture: ComponentFixture<BackyardDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDocumentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
