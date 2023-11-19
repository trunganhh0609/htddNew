import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-setting-attendance',
  templateUrl: './setting-attendance.component.html',
  styleUrls: ['./setting-attendance.component.scss']
})
export class SettingAttendanceComponent implements OnInit {
  submitted = false
  dataQR: any = {
    timeReset : 5,
    timeMinute : 2,
    timeSecond : 0
  }
  constructor(
    public dialogRef: MatDialogRef<SettingAttendanceComponent>
  ) { }

  ngOnInit(): void {
  }
  submit(){
    this.submitted = true;
    this.dialogRef.close(this.dataQR);
  }
  close(){
    this.dialogRef.close();
  }
}
