import {ComponentFixture, TestBed} from '@angular/core/testing';
import {managementBackyardComponent} from './management-backyard-container.component';

describe('managementBackyardComponent', () => {
  let component: managementBackyardComponent;
  let fixture: ComponentFixture<managementBackyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [managementBackyardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(managementBackyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
