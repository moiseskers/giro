import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    BackyardDeclarationHistoryListContainerComponent
} from './backyard-declaration-history-list-container.component';

describe('DeclarationHistoryListContainerComponent', () => {
  let component: BackyardDeclarationHistoryListContainerComponent;
  let fixture: ComponentFixture<BackyardDeclarationHistoryListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationHistoryListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationHistoryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
