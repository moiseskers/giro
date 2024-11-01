import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerDeclarationItemListContainerComponent
} from './industrial-consumer-declaration-item-list-container.component';

describe('ProducerDeclarationItemListContainerComponent', () => {
  let component: IndustrialConsumerDeclarationItemListContainerComponent;
  let fixture: ComponentFixture<IndustrialConsumerDeclarationItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrialConsumerDeclarationItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerDeclarationItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
