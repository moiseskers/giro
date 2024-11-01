import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationViewPageComponent} from './producer-declaration-view-page.component';

describe('DeclarationProducerViewPageComponent', () => {
  let component: ProducerDeclarationViewPageComponent;
  let fixture: ComponentFixture<ProducerDeclarationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
