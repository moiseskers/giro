import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessFilesFormComponent} from './process-files-form.component';

describe('DocumentFormComponent', () => {
  let component: ProcessFilesFormComponent;
  let fixture: ComponentFixture<ProcessFilesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFilesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessFilesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
