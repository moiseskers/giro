import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationContainerCreateComponent} from './declaration-container-create.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: DeclarationContainerCreateComponent;
  let fixture: ComponentFixture<DeclarationContainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationContainerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
