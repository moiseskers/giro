import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialMediaLinkFormComponent} from './material-media-link-form.component';

describe('MaterialFormComponent', () => {
  let component: MaterialMediaLinkFormComponent;
  let fixture: ComponentFixture<MaterialMediaLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialMediaLinkFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialMediaLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
