import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInterceptorsComponent } from './date-interceptors.component';

describe('DateInterceptorsComponent', () => {
  let component: DateInterceptorsComponent;
  let fixture: ComponentFixture<DateInterceptorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateInterceptorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateInterceptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
