import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestListPageComponent} from './declaration-request-list-page.component';

describe('MassListPageComponent', () => {
  let component: DeclarationRequestListPageComponent;
  let fixture: ComponentFixture<DeclarationRequestListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
