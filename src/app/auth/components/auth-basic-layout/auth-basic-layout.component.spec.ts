import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthBasicLayoutComponent} from './auth-basic-layout.component';

describe('AuthBasicLayoutComponent', () => {
  let component: AuthBasicLayoutComponent;
  let fixture: ComponentFixture<AuthBasicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBasicLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
