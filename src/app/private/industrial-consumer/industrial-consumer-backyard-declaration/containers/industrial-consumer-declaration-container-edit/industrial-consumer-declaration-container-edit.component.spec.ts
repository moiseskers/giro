import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerDeclarationContainerEditComponent
} from './industrial-consumer-declaration-container-edit.component';

describe('IndustrialConsumerDeclarationContainerEditComponent', () => {
  let component: IndustrialConsumerDeclarationContainerEditComponent;
  let fixture: ComponentFixture<IndustrialConsumerDeclarationContainerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerDeclarationContainerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerDeclarationContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
