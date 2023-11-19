import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAttendanceComponent } from './setting-attendance.component';

describe('SettingAttendanceComponent', () => {
  let component: SettingAttendanceComponent;
  let fixture: ComponentFixture<SettingAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
