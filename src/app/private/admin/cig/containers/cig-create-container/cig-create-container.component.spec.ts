import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CigCreateContainerComponent} from './cig-create-container.component';

describe('CigCreateContainerComponent', () => {
  let component: CigCreateContainerComponent;
  let fixture: ComponentFixture<CigCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CigCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CigCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
