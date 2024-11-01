import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationListContainerComponent} from './backyard-declaration-list-container.component';

describe('BackyardDeclarationListContainerComponent', () => {
  let component: BackyardDeclarationListContainerComponent;
  let fixture: ComponentFixture<BackyardDeclarationListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackyardDeclarationListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
