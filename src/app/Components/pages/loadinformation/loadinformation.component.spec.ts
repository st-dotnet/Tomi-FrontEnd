import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadinformationComponent } from './loadinformation.component';

describe('LoadinformationComponent', () => {
  let component: LoadinformationComponent;
  let fixture: ComponentFixture<LoadinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
