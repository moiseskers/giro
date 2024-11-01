import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationDataComponent} from './producer-declaration-data.component';

describe('DeclarationDataComponent', () => {
  let component: ProducerDeclarationDataComponent;
  let fixture: ComponentFixture<ProducerDeclarationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
