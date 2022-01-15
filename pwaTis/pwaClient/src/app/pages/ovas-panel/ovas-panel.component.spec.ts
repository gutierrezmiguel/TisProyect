import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvasPanelComponent } from './ovas-panel.component';

describe('OvasPanelComponent', () => {
  let component: OvasPanelComponent;
  let fixture: ComponentFixture<OvasPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvasPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvasPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
