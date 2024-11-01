import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationsInTerritoryListComponent} from './operations-in-territory-list.component';

describe('OperationsInTerritoryListComponent', () => {
  let component: OperationsInTerritoryListComponent;
  let fixture: ComponentFixture<OperationsInTerritoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsInTerritoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationsInTerritoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
