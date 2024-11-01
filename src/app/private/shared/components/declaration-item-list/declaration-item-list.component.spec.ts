import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationItemListComponent} from './declaration-item-list.component';

describe('DeclaredTonsListComponent', () => {
  let component: DeclarationItemListComponent;
  let fixture: ComponentFixture<DeclarationItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
