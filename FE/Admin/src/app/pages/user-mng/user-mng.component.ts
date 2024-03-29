import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserMngService } from 'src/app/services/management/user-mng.service';
import { UserMngFormComponent } from './user-mng-form/user-mng-form.component';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-user-mng',
  templateUrl: './user-mng.component.html',
  styleUrls: ['./user-mng.component.scss']
})

export class UserMngComponent implements OnInit {

  lstUsers = [];
  roles: any[];

  selectedRole: any;
  selectedRoleId: any = '';

  constructor(
    private userMngService: UserMngService,
    private dialog: MatDialog,
    // private messageService: MessageService
  ) {
    this.roles = [
      {name: 'Tất cả', id: ''},
      {name: 'Admin', id: 'ROLE001'},
      {name: 'Giảng viên', id: 'ROLE002'},
      {name: 'Sinh viên', id: 'ROLE003'}
  ];
  }

  ngOnInit(): void {

    this.getData()
  }

  changeSearch(event:any){
    this.getData();
  }

  getData(){
    this.userMngService.searchUser(this.selectedRoleId).subscribe(result => {
      console.log(result);
      if(result.status === true){
        this.lstUsers = result.data;
      }
    })
  }

  addUser(){
    this.dialog.open(UserMngFormComponent, {
      width: '800px',
      height: '500px'
    }).afterClosed().subscribe(data => {
      if(data == true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm mới tài khoản thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData()
      }
    })
  }

  edit(data:any){
    this.dialog.open(UserMngFormComponent, {
      data: data,
      width: '800px',
      height: '500px'
    }).afterClosed().subscribe(data => {
      if(data == true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cập nhật tài khoản thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData()
      }
    })
  }

  delete(item:any){
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userMngService.deleteUser({'userName':item.userName}).subscribe(res=>{
          if(res.status){
            this.getData()
          }
        });
      }
    });
  }

  addExcelStudent(event:any){
    let excelFile: File = event.target.files[0];
    let formData:FormData = new FormData();
    formData.append('file', excelFile);
    this.userMngService.importStudentByEx(formData).subscribe(res=>{
      console.log(res);
      if(res.status){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm danh sách tài khoản sinh viên thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.getData()
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Thêm danh sách tài khoản sinh viên thất bại! Vui lòng kiểm tra lại file của bạn',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
