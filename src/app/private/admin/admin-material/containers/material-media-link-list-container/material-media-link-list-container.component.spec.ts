import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialMediaLinkListContainerComponent} from './material-media-link-list-container.component';

describe('MaterialMediaListContainerComponent', () => {
  let component: MaterialMediaLinkListContainerComponent;
  let fixture: ComponentFixture<MaterialMediaLinkListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialMediaLinkListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialMediaLinkListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
