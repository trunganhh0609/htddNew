import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThienAnConstant } from 'src/app/constants/thien-an.constant';
import { CommonService } from 'src/app/services/common/common.service';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';

@Component({
  selector: 'app-generate-point',
  templateUrl: './generate-point.component.html',
  styleUrls: ['./generate-point.component.scss']
})
export class GeneratePointComponent implements OnInit {

  lstClass: [] = [];
  page:number = 1;
  userName: string = '';

  constructor(
    private commonService: CommonService,
    private router: Router
) { }

  ngOnInit(): void {
    this.userName = AuthenticationUtil.decodeToken().Username;
    this.getClassByIdTeacher();
  }


  getClassByIdTeacher(){
    this.commonService.getClassByTeacher().subscribe(res=>{
      if(res.status){
        this.lstClass = res.data;
      }

    })
  }

  listStudent(data:any){
    this.router.navigate(['gen-point/class-point'], {
      queryParams: {classId: data.classId, className: data.className, startDate: data.startDate, endDate: data.endDate, totalClassPeriod: data.totalClassPeriod}
    })
  }
}

