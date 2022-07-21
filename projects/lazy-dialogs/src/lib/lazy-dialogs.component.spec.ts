import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyDialogsComponent } from './lazy-dialogs.component';

describe('LazyDialogsComponent', () => {
  let component: LazyDialogsComponent;
  let fixture: ComponentFixture<LazyDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyDialogsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
