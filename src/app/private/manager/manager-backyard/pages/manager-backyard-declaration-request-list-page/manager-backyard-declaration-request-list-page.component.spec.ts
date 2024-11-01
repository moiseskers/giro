import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    ManagerBackyardDeclarationRequestListPageComponent
} from './manager-backyard-declaration-request-list-page.component';

describe('ManagerValuerBackyardDeclarationRequestListPageComponent', () => {
  let component: ManagerBackyardDeclarationRequestListPageComponent;
  let fixture: ComponentFixture<ManagerBackyardDeclarationRequestListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerBackyardDeclarationRequestListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBackyardDeclarationRequestListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
