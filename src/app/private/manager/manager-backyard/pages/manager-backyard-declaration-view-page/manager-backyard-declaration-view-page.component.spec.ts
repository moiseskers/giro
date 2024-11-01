import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerBackyardDeclarationViewPageComponent} from './manager-backyard-declaration-view-page.component';

describe('DeclarationProducerViewPageComponent', () => {
  let component: ManagerBackyardDeclarationViewPageComponent;
  let fixture: ComponentFixture<ManagerBackyardDeclarationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBackyardDeclarationViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBackyardDeclarationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
