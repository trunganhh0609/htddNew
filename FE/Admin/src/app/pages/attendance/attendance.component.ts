import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  time: any = new Date().toLocaleString();
  expTime = new Date().setSeconds(new Date().getSeconds() + 12);
  updateSubscription: Subscription;
  breadCrumbItems: Array<{}>;


  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Điểm danh', active: true }];
    this.refreshQr();
    // this.updateSubscription = interval(3000).subscribe(
    //   (val) => { this.refreshQr()})

  }
  refreshQr() {
    // this.delay(3000);
    this.time = new Date().toLocaleString();
    this.time = this.time + ";" +"COMP03101"
  }
}
