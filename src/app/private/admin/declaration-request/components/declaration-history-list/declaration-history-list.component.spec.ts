import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationHistoryListComponent} from './declaration-history-list.component';

describe('DeclarationHistoryListComponent', () => {
  let component: DeclarationHistoryListComponent;
  let fixture: ComponentFixture<DeclarationHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationHistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
