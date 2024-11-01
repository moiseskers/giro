import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationHistoryListContainerComponent} from './declaration-history-list-container.component';

describe('DeclarationHistoryListContainerComponent', () => {
  let component: DeclarationHistoryListContainerComponent;
  let fixture: ComponentFixture<DeclarationHistoryListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationHistoryListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationHistoryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
