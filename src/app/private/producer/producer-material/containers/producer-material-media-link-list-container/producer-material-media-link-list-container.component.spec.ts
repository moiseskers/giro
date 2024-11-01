import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerMaterialMediaLinkListContainerComponent} from './producer-material-media-link-list-container.component';

describe('MaterialMediaListContainerComponent', () => {
  let component: ProducerMaterialMediaLinkListContainerComponent;
  let fixture: ComponentFixture<ProducerMaterialMediaLinkListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerMaterialMediaLinkListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerMaterialMediaLinkListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
