import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationContainerCreateComponent} from './backyard-declaration-container-create.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: BackyardDeclarationContainerCreateComponent;
  let fixture: ComponentFixture<BackyardDeclarationContainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationContainerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
