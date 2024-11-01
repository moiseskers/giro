import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    BackyardDeclarationRequestEditContainerComponent
} from './backyard-declaration-request-edit-container.component';

describe('BackyardDeclarationRequestEditContainerComponent', () => {
  let component: BackyardDeclarationRequestEditContainerComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationRequestEditContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
