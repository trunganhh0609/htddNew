import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrAttendanceComponent } from './qr-attendance.component';

describe('QrAttendanceComponent', () => {
  let component: QrAttendanceComponent;
  let fixture: ComponentFixture<QrAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
