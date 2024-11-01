import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GiroUploadComponent} from './giro-upload.component';

describe('UploadComponent', () => {
  let component: GiroUploadComponent;
  let fixture: ComponentFixture<GiroUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiroUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiroUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
