import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GiroDataViewComponent} from './giro-data-view.component';

describe('GiroMenuBarComponent', () => {
  let component: GiroDataViewComponent;
  let fixture: ComponentFixture<GiroDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiroDataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiroDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
