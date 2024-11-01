import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerBackyardDocumentCreateContainerComponent} from './manager-backyard-document-create-container.component';

describe('IndustrialConsumerDocumentCreateContainerComponent', () => {
  let component: ManagerBackyardDocumentCreateContainerComponent;
  let fixture: ComponentFixture<ManagerBackyardDocumentCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerBackyardDocumentCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBackyardDocumentCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
