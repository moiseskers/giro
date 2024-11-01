import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationTableFormComponent} from './declaration-table-form.component';

describe('TonsDeclarationTableFormComponent', () => {
  let component: DeclarationTableFormComponent;
  let fixture: ComponentFixture<DeclarationTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationTableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
