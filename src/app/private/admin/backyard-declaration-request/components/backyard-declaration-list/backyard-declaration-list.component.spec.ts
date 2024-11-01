import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationListComponent} from './backyard-declaration-list.component';

describe('DeclarationListComponent', () => {
  let component: BackyardDeclarationListComponent;
  let fixture: ComponentFixture<BackyardDeclarationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
