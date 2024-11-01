import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerMaterialMediaLinkListContainerComponent
} from './industrial-consumer-material-media-link-list-container.component';

describe('MaterialMediaListContainerComponent', () => {
  let component: IndustrialConsumerMaterialMediaLinkListContainerComponent;
  let fixture: ComponentFixture<IndustrialConsumerMaterialMediaLinkListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerMaterialMediaLinkListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerMaterialMediaLinkListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
