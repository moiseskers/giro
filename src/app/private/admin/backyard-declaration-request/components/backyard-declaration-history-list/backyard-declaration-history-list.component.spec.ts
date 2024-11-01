import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackyardDeclarationHistoryListComponent} from './backyard-declaration-history-list.component';

describe('DeclarationHistoryListComponent', () => {
  let component: BackyardDeclarationHistoryListComponent;
  let fixture: ComponentFixture<BackyardDeclarationHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardDeclarationHistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackyardDeclarationHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
