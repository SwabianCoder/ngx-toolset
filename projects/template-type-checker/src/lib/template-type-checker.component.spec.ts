import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTypeCheckerComponent } from './template-type-checker.component';

describe('TemplateTypeCheckerComponent', () => {
  let component: TemplateTypeCheckerComponent;
  let fixture: ComponentFixture<TemplateTypeCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateTypeCheckerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTypeCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
