import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerDeclarationContainerCreateComponent
} from './industrial-consumer-declaration-container-create.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: IndustrialConsumerDeclarationContainerCreateComponent;
  let fixture: ComponentFixture<IndustrialConsumerDeclarationContainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrialConsumerDeclarationContainerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerDeclarationContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
