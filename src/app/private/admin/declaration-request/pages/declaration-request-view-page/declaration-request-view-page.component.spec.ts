import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestViewPageComponent} from './declaration-request-view-page.component';

describe('MassViewPageComponent', () => {
  let component: DeclarationRequestViewPageComponent;
  let fixture: ComponentFixture<DeclarationRequestViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
