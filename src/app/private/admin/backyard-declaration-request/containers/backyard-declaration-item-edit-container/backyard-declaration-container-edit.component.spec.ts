import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationContainerEditComponent} from './backyard-declaration-container-edit.component';

describe('TonsDeclarationContainerComponent', () => {
  let component: BackyardDeclarationContainerEditComponent;
  let fixture: ComponentFixture<BackyardDeclarationContainerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationContainerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
