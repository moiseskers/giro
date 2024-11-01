import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndustrialConsumerDeclarationViewPageComponent} from './industrial-consumer-declaration-view-page.component';

describe('DeclarationProducerViewPageComponent', () => {
  let component: IndustrialConsumerDeclarationViewPageComponent;
  let fixture: ComponentFixture<IndustrialConsumerDeclarationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrialConsumerDeclarationViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerDeclarationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
