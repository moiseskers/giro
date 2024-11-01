import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationContainerEditComponent} from './declaration-container-edit.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: DeclarationContainerEditComponent;
  let fixture: ComponentFixture<DeclarationContainerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationContainerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
