import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyDialogContainerComponent } from './lazy-dialog-container.component';

describe('LazyDialogContainerComponent', () => {
  let component: LazyDialogContainerComponent;
  let fixture: ComponentFixture<LazyDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyDialogContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
