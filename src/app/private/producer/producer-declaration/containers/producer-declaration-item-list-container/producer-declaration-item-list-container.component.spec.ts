import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationItemListContainerComponent} from './producer-declaration-item-list-container.component';

describe('ProducerDeclarationItemListContainerComponent', () => {
  let component: ProducerDeclarationItemListContainerComponent;
  let fixture: ComponentFixture<ProducerDeclarationItemListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationItemListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationItemListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
