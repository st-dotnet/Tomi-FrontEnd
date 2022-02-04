import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersbydepartmentComponent } from './parametersbydepartment.component';

describe('ParametersbydepartmentComponent', () => {
  let component: ParametersbydepartmentComponent;
  let fixture: ComponentFixture<ParametersbydepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersbydepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersbydepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
