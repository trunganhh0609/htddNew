import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<SettingAttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
  }
  submit(invalid){
    this.submitted = true;
    if(!invalid) {
      this.dialogRef.close(this.dataQR);
    }
  }
  close(){
    this.dialogRef.close();
  }
}
