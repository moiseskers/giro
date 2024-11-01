import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerOperationsInTerritoryContainerComponent} from './producer-operations-in-territory-container.component';

describe('OperationsInTerritoryContainerComponent', () => {
  let component: ProducerOperationsInTerritoryContainerComponent;
  let fixture: ComponentFixture<ProducerOperationsInTerritoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerOperationsInTerritoryContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerOperationsInTerritoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
