import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PartnersContainerComponent} from './partners-container.component';

describe('PartnersContainerComponent', () => {
  let component: PartnersContainerComponent;
  let fixture: ComponentFixture<PartnersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnersContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
