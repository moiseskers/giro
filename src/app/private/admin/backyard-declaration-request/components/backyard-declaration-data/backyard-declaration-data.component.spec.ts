import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationDataComponent} from './backyard-declaration-data.component';

describe('RequestStatementDetailDataComponent', () => {
  let component: BackyardDeclarationDataComponent;
  let fixture: ComponentFixture<BackyardDeclarationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
