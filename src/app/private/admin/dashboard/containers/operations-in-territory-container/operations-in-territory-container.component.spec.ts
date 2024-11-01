import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationsInTerritoryContainerComponent} from './operations-in-territory-container.component';

describe('OperationsInTerritoryContainerComponent', () => {
  let component: OperationsInTerritoryContainerComponent;
  let fixture: ComponentFixture<OperationsInTerritoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsInTerritoryContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationsInTerritoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
