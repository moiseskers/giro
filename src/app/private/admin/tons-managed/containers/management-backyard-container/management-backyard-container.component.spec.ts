import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionPatioTraseroComponent} from './management-backyard-container.component';

describe('GestionPatioTraseroComponent', () => {
  let component: GestionPatioTraseroComponent;
  let fixture: ComponentFixture<GestionPatioTraseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionPatioTraseroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionPatioTraseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
