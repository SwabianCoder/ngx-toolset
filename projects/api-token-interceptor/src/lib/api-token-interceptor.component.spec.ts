import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTokenInterceptorComponent } from './api-token-interceptor.component';

describe('ApiTokenInterceptorComponent', () => {
  let component: ApiTokenInterceptorComponent;
  let fixture: ComponentFixture<ApiTokenInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiTokenInterceptorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiTokenInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
