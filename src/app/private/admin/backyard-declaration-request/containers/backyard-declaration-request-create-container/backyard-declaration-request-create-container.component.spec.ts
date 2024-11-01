import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    BackyardDeclarationRequestCreateContainerComponent
} from './backyard-declaration-request-create-container.component';

describe('BackyardDeclarationRequestCreateContainerComponent', () => {
  let component: BackyardDeclarationRequestCreateContainerComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationRequestCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
