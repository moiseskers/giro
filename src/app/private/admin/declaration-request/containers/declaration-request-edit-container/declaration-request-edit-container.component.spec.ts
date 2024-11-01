import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestEditContainerComponent} from './declaration-request-edit-container.component';

describe('RequestStatementEditComponent', () => {
  let component: DeclarationRequestEditContainerComponent;
  let fixture: ComponentFixture<DeclarationRequestEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestEditContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
