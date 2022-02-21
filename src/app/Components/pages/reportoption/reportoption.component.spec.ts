import { ComponentFixture, TestBed } from '@angular/core/testing';

import { reportOptionComponents } from './reportoption.component';

describe('ReportOptionComponent', () => {
  let component: reportOptionComponents;
  let fixture: ComponentFixture<reportOptionComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ reportOptionComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(reportOptionComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
