import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationProducerListComponent} from './declaration-producer-list.component';

describe('MassListComponent', () => {
  let component: DeclarationProducerListComponent;
  let fixture: ComponentFixture<DeclarationProducerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationProducerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationProducerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
