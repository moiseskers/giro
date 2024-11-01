import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ManagementBackyardContainerComponent } from './management-backyard-container.component';

describe('managementBackyardComponent', () => {
  let component: ManagementBackyardContainerComponent;
  let fixture: ComponentFixture<ManagementBackyardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementBackyardContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementBackyardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
