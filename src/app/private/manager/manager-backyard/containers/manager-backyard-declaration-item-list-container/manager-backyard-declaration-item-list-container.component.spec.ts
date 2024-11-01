import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    ManagerBackyardDeclarationItemListContainerComponent
} from './manager-backyard-declaration-item-list-container.component';

describe('ProducerDeclarationItemListContainerComponent', () => {
  let component: ManagerBackyardDeclarationItemListContainerComponent;
  let fixture: ComponentFixture<ManagerBackyardDeclarationItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBackyardDeclarationItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBackyardDeclarationItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
