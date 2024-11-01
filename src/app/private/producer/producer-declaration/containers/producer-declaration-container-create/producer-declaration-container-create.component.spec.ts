import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationContainerCreateComponent} from './producer-declaration-container-create.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: ProducerDeclarationContainerCreateComponent;
  let fixture: ComponentFixture<ProducerDeclarationContainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationContainerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
