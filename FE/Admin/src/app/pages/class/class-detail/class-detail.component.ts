import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThienAnConstant } from 'src/app/constants/thien-an.constant';
import { CommonService } from 'src/app/services/common/common.service';
import {MatDialog} from '@angular/material/dialog';
import { SettingAttendanceComponent } from '../setting-attendance/setting-attendance.component';
import { QrAttendanceComponent } from '../qr-attendance/qr-attendance.component';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { HistoryAttendanceService } from 'src/app/services/history-attendance/history-attendance.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent implements OnInit {
  lstSinhVien: any = [];
  keySearch : any;
  dataTable: any;
  lesson: number = 1;
  thisLesson: number = 0;
  lstLesson = [];
  dataCheckin: any = []
  classInfo: any
  totalAttendance: number = 0
  updateSubscription: Subscription
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private attendanceService : AttendanceService,
    private loaderService : LoaderService,
    private historyService : HistoryAttendanceService,
    ) { }

  ngOnInit(): void{
    this.getClassInfo()
  }
  async getStudentInClass(){
    // this.loaderService.changeLoader(true)
    const param = {
      "QuerryString":"[sp_appTeacher_DiemDanhKeHoach_ChiTiet_Load_List]0," + this.classInfo.idLop +"," + this.classInfo.idMon + ",'2020-01-01',1,1,1" ,
      "PASSWORD": ThienAnConstant.PASSWORD
    }
    this.lstLesson = []
    await this.commonService.getStudentInClass(param).toPromise().then(res=>{
      this.lstSinhVien = res.Content;
      // this.dataTable = this.lstSinhVien;
      var numberOfWeeks = this.diff_weeks(new Date(this.classInfo.startDate),new Date(this.classInfo.endDate))
      var thisWeek = this.diff_weeks(new Date(this.classInfo.startDate),new Date())
      this.thisLesson = thisWeek;
      for(var i = 1; i < numberOfWeeks+1; i++){
        this.lstLesson.push(i);
      }
      if(this.lesson == 0){
        this.lesson = thisWeek;
      }

      const request = {
        idClass : this.classInfo.idLop,
        idSubject: this.classInfo.idMon,
        lesson: this.lesson
      }
      // this.getCheckinData(request);
    })

  }
  async getClassInfo(){
    await this.route.queryParams.subscribe(async res =>{
      this.classInfo = res
      // await this.getStudentInClass();
      await this.getCheckinData()
    })
  }

  getCheckinData(){
    this.lstLesson = []
    var numberOfWeeks = this.diff_weeks(new Date(this.classInfo.startDate),new Date(this.classInfo.endDate))
    var thisWeek = this.diff_weeks(new Date(this.classInfo.startDate),new Date())
    console.log(thisWeek);

    this.thisLesson = thisWeek;
    for(var i = 1; i < numberOfWeeks+1; i++){
      this.lstLesson.push(i);
    }
    // if(this.lesson == 0){
    //   this.lesson = 1;
    // }
    const param = {
      classId: this.classInfo.classId,
      lesson: this.lesson
    }
    this.attendanceService.getCheckInData(param).subscribe(res=>{
      console.log(res);
      if(res.status){
        this.dataTable = res.data
      }
    })
  }
  openPopup(status:any){
    this.dialog.open(SettingAttendanceComponent,
    {
      width: "600px"
    }
    ).afterClosed().subscribe(res => {
      const param = {
        classId : this.classInfo.classId,
        lesson: this.lesson
      }
      if(status == '01-02'){
        this.historyService.addHistory(param).subscribe(res => {})
      }

      const data = {
        'week': this.lesson,
        'timeReset' : res.timeReset,
        'timeMinute': res.timeMinute,
        'timeSecond': res.timeSecond,
        'idClass': this.classInfo.classId,
        'status': status
      }
      this.dialog.open(QrAttendanceComponent,{
        width: '600px',
        data: data
      }).afterClosed().subscribe(res => {
        this.getStudentInClass();
        let lstStudent = [...this.dataTable]
        const param = {
          lstAbsent : lstStudent,
          classId: this.classInfo.classId,
          lesson: this.lesson
        }
        this.attendanceService.addAbsentStudent(param).subscribe(response =>{
          this.getCheckinData();
        })
      })
    })
  }
  diff_weeks(dt2 : Date, dt1 : Date)
 {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  return Math.abs(Math.round(diff));
 }


}



