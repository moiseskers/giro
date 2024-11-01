import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestListComponent} from './declaration-request-list.component';

describe('MassListComponent', () => {
  let component: DeclarationRequestListComponent;
  let fixture: ComponentFixture<DeclarationRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
