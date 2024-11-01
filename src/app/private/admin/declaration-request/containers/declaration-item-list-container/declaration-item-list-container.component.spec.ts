import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationItemListContainerComponent} from './declaration-item-list-container.component';

describe('DeclaredTonsListContainerComponent', () => {
  let component: DeclarationItemListContainerComponent;
  let fixture: ComponentFixture<DeclarationItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
