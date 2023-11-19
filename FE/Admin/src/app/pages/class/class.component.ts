import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThienAnConstant } from 'src/app/constants/thien-an.constant';
import { CommonService } from 'src/app/services/common/common.service';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  lstClass: [] = [];
  page:number = 1;
  userName: string = '';

  constructor(
    private commonService: CommonService,
    private router: Router
) { }

  ngOnInit(): void {
    this.getClassByIdTeacher();
  }


  getClassByIdTeacher(){
    // const param = {
    //   "QuerryString":"[sp_appTeacher_ListClass] " + idTeacher,
    //   "PASSWORD": ThienAnConstant.PASSWORD
    // }
    this.commonService.getClassByTeacher().subscribe(res=>{
      if(res.status){
        this.lstClass = res.data;
      }

    })
  }

  listStudent(data:any){
    this.router.navigate(['class/class-detail'], {
      queryParams: {classId: data.classId, className: data.className, startDate: data.startDate, endDate: data.endDate}
    })
  }
}
