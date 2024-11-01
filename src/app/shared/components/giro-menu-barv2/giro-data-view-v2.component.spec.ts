import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GiroDataViewV2Component} from './giro-data-view-v2.component';

describe('GiroMenuBarComponent', () => {
  let component: GiroDataViewV2Component;
  let fixture: ComponentFixture<GiroDataViewV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiroDataViewV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiroDataViewV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
