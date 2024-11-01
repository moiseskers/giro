import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationsInTerritoryMapComponent} from './operations-in-territory-map.component';

describe('OperationsInTerritoryMapComponent', () => {
  let component: OperationsInTerritoryMapComponent;
  let fixture: ComponentFixture<OperationsInTerritoryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsInTerritoryMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationsInTerritoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
