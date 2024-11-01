import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingDetailListComponent} from './matching-detail-list.component';

describe('InvoiceItemListComponent', () => {
  let component: MatchingDetailListComponent;
  let fixture: ComponentFixture<MatchingDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchingDetailListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchingDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
