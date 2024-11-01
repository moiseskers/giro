import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CigListPageComponent} from './cig-list-page.component';

describe('CigListPageComponent', () => {
  let component: CigListPageComponent;
  let fixture: ComponentFixture<CigListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CigListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CigListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
