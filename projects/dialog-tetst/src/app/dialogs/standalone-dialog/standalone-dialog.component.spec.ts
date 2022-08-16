import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneDialogComponent } from './standalone-dialog.component';

describe('StandaloneDialogComponent', () => {
  let component: StandaloneDialogComponent;
  let fixture: ComponentFixture<StandaloneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StandaloneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandaloneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
