import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTerminalComponent } from './program-terminal.component';

describe('ProgramTerminalComponent', () => {
  let component: ProgramTerminalComponent;
  let fixture: ComponentFixture<ProgramTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
