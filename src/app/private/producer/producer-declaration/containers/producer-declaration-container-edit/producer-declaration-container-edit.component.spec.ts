import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationContainerEditComponent} from './producer-declaration-container-edit.component';

describe('ProducerDeclarationContainerEditComponent', () => {
  let component: ProducerDeclarationContainerEditComponent;
  let fixture: ComponentFixture<ProducerDeclarationContainerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationContainerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
