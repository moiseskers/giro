import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockListPageComponent} from './stock-list-page.component';

describe('StockListPageComponent', () => {
  let component: StockListPageComponent;
  let fixture: ComponentFixture<StockListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
