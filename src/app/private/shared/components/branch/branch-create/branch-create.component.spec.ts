import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchCreateComponent} from './branch-create.component';

describe('BranchesCreateComponent', () => {
  let component: BranchCreateComponent;
  let fixture: ComponentFixture<BranchCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
