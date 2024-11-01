import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationItemListComponent} from './backyard-declaration-item-list.component';

describe('DeclaredTonsListComponent', () => {
  let component: BackyardDeclarationItemListComponent;
  let fixture: ComponentFixture<BackyardDeclarationItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
