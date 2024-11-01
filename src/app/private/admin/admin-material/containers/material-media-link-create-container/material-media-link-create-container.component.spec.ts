import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialMediaLinkCreateContainerComponent} from './material-media-link-create-container.component';

describe('MaterialCreateComponent', () => {
  let component: MaterialMediaLinkCreateContainerComponent;
  let fixture: ComponentFixture<MaterialMediaLinkCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialMediaLinkCreateContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialMediaLinkCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
