import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserMngService } from 'src/app/services/management/user-mng.service';
import { UserMngFormComponent } from './user-mng-form/user-mng-form.component';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-mng',
  templateUrl: './user-mng.component.html',
  styleUrls: ['./user-mng.component.scss']
})
export class UserMngComponent implements OnInit {

  lstUsers = [];
  constructor(
    private userMngService: UserMngService,
    private dialog: MatDialog,
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.getData()
  }

  getData(){
    this.userMngService.searchUser().subscribe(result => {
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
}
