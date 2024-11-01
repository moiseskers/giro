import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationRequestDataComponent} from './backyard-declaration-request-data.component';

describe('DeclarationDataComponent', () => {
  let component: BackyardDeclarationRequestDataComponent;
  let fixture: ComponentFixture<BackyardDeclarationRequestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationRequestDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationRequestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
