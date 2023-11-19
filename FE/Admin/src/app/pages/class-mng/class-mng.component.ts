import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassMngService } from 'src/app/services/management/class-mng.service';
import Swal from 'sweetalert2';
import { ClassMngFormComponent } from './class-mng-form/class-mng-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-mng',
  templateUrl: './class-mng.component.html',
  styleUrls: ['./class-mng.component.scss']
})
export class ClassMngComponent implements OnInit {

  listClass = [];

  constructor(
    private classMngService: ClassMngService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.classMngService.getData().subscribe(result=>{
      if(result.status){
        this.listClass = result.responseData
        console.log(result);

      }
    })
  }

  addClass(){
    this.dialog.open(ClassMngFormComponent, {
      width: '800px',
      height: '500px'
    }).afterClosed().subscribe(data => {
      if(data == true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm mới lớp học thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData()
      }else if(data == false){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Thêm mới lớp học thất bại',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }


  edit(item:any){
    this.dialog.open(ClassMngFormComponent, {
      width: '800px',
      height: '500px',
      data: item
    }).afterClosed().subscribe(data => {
      if(data == true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cập nhật lớp học thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData()
      }else if(data == false){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cập nhật lớp học thất bại',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  delete(item:any){
    Swal.fire({
      title: "Xóa lớp học",
      text: "Bạn có chắc chắn muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      this.classMngService.deleteClass(item).subscribe(result =>{
        if(result.status){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Xóa lớp học thành công',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData();
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Xóa lớp học thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    });
  }

  gotoClassDetail(classId){
    this.router.navigate(["class-mng/class-mng-detail"],{
      queryParams: {"classId": classId}
    })
  }

}
