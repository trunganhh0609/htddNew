import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ThienAnConstant } from 'src/app/constants/thien-an.constant';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { CommonService } from 'src/app/services/common/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PointService } from 'src/app/services/point/point.service';
import { CreatePointFormComponent } from './create-point-form/create-point-form.component';
import * as XLSX from 'xlsx';
import { element } from 'protractor';

@Component({
  selector: 'app-class-point',
  templateUrl: './class-point.component.html',
  styleUrls: ['./class-point.component.scss']
})
export class ClassPointComponent implements OnInit {
  dataTable: any = [];
  classInfo: any = {};
  dataCheckin : any;
  totalAttendance: number = 0;
  lstSinhVien: any = [];
  lstPoint:any = [];
  dataSheet:any =[];
  countLesson: number = 0;
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private attendanceService: AttendanceService,
    private pointService: PointService
  ) { }

  ngOnInit(): void {
    this.getClassInfo();
    this.getCheckinData();
  }

  openPopup(){
    this.dialog.open(CreatePointFormComponent).afterClosed().subscribe(data=>{
      const request = {
        classId : this.classInfo.classId,
      }
      if(data){
        this.caculateAndSubmitPoint(data)
      }
      // this.getCheckinData(request, result)
    })
  }
  async getClassInfo(){
    await this.route.queryParams.subscribe(async res =>{
      this.classInfo = res
    })
  }

  caculateAndSubmitPoint(request: any){
    this.dataTable.forEach(element => {
      element['point']  = 10;
      // const totalAttendance = parseFloat(element.totalAttendance);
      // const numAttendance = parseFloat(element.numAttendanceInClass)
      // const numLate = parseFloat(element.numAttendanceLate);
      // const numAbsent = Math.round( totalAttendance -  totalAttendance + numLate * parseFloat(request.late));
      // if((totalAttendance - Math.round(numLate*parseFloat(request.late)) - numAttendance) >= request.half){
      //     element['point'] = 5
      // }
      // if((totalAttendance - Math.round(numLate*parseFloat(request.late)) - numAttendance) >= Math.round(totalAttendance * 1/5)){
      //   element['point'] = 0
      // }
      var perAbsenData = 100 - 100*(parseFloat(element['sumClassPeriod']) / parseFloat(element['totalCPInClass']))
      if(perAbsenData >= parseFloat(request.percentAbsen)){
        element['point'] = 0;
      }
    });
    const param  = {
      classId: this.classInfo.classId,
      lstPoint : this.dataTable
    }
    this.pointService.addPoint(param).subscribe(result =>{
      console.log(result);

    })
  }

  getCheckinData(){
    const param = {
      classId: this.classInfo.classId,
    }
    this.pointService.getPoint(param).subscribe(res=>{
      console.log(res);
      if(res.status){
        this.dataTable = res.data
      }
    })
  }

  diff_weeks(dt2 : Date, dt1 : Date)
  {
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24 * 7);
   return Math.abs(Math.round(diff));
  }
  setDataSheet(){
    this.dataSheet = []
    this.dataTable.forEach((element, index)=>{
      let itemData = {}
      console.log(element);
      itemData['STT'] = index + 1;
      itemData['Mã sinh viên'] = element.userName;
      itemData['Họ tên'] = element.name;
      itemData['Giới tính'] = element.gender == true ? 'Nam' : 'Nữ';
      itemData['Ngày sinh'] = new Date(element.birthDate).toLocaleDateString();
      itemData['Điểm chuyên cần'] = element.point;
      this.dataSheet.push(itemData);
    })
  }

  export(){
    this.setDataSheet();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSheet);
    ws['!cols'] = [{width:10}, {width:15}, {width:15}, {width:25}, {width:20},{width:20}]
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "diem_chuyen_can "+ this.classInfo.className +".xlsx");
  }

}
