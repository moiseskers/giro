import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationItemListContainerComponent} from './backyard-declaration-item-list-container.component';

describe('DeclaredTonsListContainerComponent', () => {
  let component: BackyardDeclarationItemListContainerComponent;
  let fixture: ComponentFixture<BackyardDeclarationItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
