import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassMngService } from 'src/app/services/management/class-mng.service';
import { ClassMngDeailFormComponent } from './class-mng-deail-form/class-mng-deail-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-mng-detail',
  templateUrl: './class-mng-detail.component.html',
  styleUrls: ['./class-mng-detail.component.scss']
})
export class ClassMngDetailComponent implements OnInit {

  classId = '';
  lstStudent='';

  constructor(
    private route: ActivatedRoute,
    private classMngService: ClassMngService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(res=>{
      this.classId = res.classId;
      this.classMngService.getStudentInClass(res.classId).subscribe(res=>{
        console.log(res.data);
        if(res.status){
          this.lstStudent =res.data
        }
      })
    })
  }


  addStudent(){
    this.dialog.open(
      ClassMngDeailFormComponent
      ,{
        minHeight: "500px",
        width: "800px",
        data: {
          classId: this.classId,
          lstStudent: this.lstStudent
        }
      }).afterClosed().subscribe(res=>{
        if(res == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm sinh viên thành công',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData()
        }else if(res == false){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Thêm sinh viên thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

  delete(item:any){
    Swal.fire({
      text: "Bạn có chắc chắn muốn xóa sinh viên này khỏi lớp học không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      const param = {
        userId: item.userId,
        classId: this.classId
      }
      this.classMngService.deleteStudentInClass(param).subscribe(result =>{
        if(result.status){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Xóa sinh viên khỏi lớp học thành công',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData();
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Xóa sinh viên khỏi lớp học thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    });
  }
}
