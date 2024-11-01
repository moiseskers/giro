import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducerDeclarationListPageComponent} from './producer-declaration-list-page.component';

describe('MassListPageComponent', () => {
  let component: ProducerDeclarationListPageComponent;
  let fixture: ComponentFixture<ProducerDeclarationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerDeclarationListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerDeclarationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
