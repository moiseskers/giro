import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    IndustrialConsumerBackyardDeclarationRequestListPageComponent
} from './industrial-consumer-backyard-declaration-request-list-page.component';

describe('IndustrialConsumerBackyardDeclarationRequestListPageComponent', () => {
  let component: IndustrialConsumerBackyardDeclarationRequestListPageComponent;
  let fixture: ComponentFixture<IndustrialConsumerBackyardDeclarationRequestListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrialConsumerBackyardDeclarationRequestListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrialConsumerBackyardDeclarationRequestListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
