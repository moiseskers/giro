import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerApplicationListPageComponent} from './manager-application-list-page.component';

describe('ManagerApplicationListPageComponent', () => {
  let component: ManagerApplicationListPageComponent;
  let fixture: ComponentFixture<ManagerApplicationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerApplicationListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerApplicationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
