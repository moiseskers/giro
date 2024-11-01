import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationListContainerComponent} from './declaration-list-container.component';

describe('DeclarationsComponent', () => {
  let component: DeclarationListContainerComponent;
  let fixture: ComponentFixture<DeclarationListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
