import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerPartnersContainerComponent} from './producer-partners-container.component';

describe('PartnersContainerComponent', () => {
  let component: ProducerPartnersContainerComponent;
  let fixture: ComponentFixture<ProducerPartnersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducerPartnersContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerPartnersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
