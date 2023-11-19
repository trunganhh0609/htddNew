import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-qr-attendance',
  templateUrl: './qr-attendance.component.html',
  styleUrls: ['./qr-attendance.component.scss']
})
export class QrAttendanceComponent implements OnInit {
  value: any;
  updateSubscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<QrAttendanceComponent>) { }

  ngOnInit(): void {
    this.getQRData();
    this.updateSubscription = interval(this.data.timeReset * 1000).subscribe(
      (val) => { this.getQRData()})
    var timeQR = this.data.timeMinute * 60 * 1000 + this.data.timeSecond * 1000
    interval(timeQR).subscribe(
      res => {this.closePopup()}
    )
  }
  getQRData(){
    var time = new Date();
    time.setSeconds(time.getSeconds() + this.data.timeReset)
    this.value =
    this.data.week + ';'
     + this.data.idClass + ';'
     + this.formatDate(new Date()) + ';'
     + this.formatDate(time) + ';'
     + this.data.status
  }
  closePopup(){
    this.updateSubscription.unsubscribe()
    this.dialogRef.close();
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
}
