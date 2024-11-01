import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessFilesCreateComponent} from './process-files-create.component';

describe('CreateUserComponent', () => {
  let component: ProcessFilesCreateComponent;
  let fixture: ComponentFixture<ProcessFilesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFilesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessFilesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
