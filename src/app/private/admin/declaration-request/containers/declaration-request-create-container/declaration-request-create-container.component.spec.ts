import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestCreateContainerComponent} from './declaration-request-create-container.component';

describe('RequestStatementCreateComponent', () => {
  let component: DeclarationRequestCreateContainerComponent;
  let fixture: ComponentFixture<DeclarationRequestCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
