import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationRequestDataComponent} from './declaration-request-data.component';

describe('DeclarationDataComponent', () => {
  let component: DeclarationRequestDataComponent;
  let fixture: ComponentFixture<DeclarationRequestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationRequestDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationRequestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
