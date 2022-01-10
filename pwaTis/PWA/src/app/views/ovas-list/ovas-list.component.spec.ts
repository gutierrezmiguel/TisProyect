import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvasListComponent } from './ovas-list.component';

describe('OvasListComponent', () => {
  let component: OvasListComponent;
  let fixture: ComponentFixture<OvasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
