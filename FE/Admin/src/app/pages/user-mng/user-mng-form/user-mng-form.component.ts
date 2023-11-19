import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UserMngService } from 'src/app/services/management/user-mng.service';
import { CommonUtil } from 'src/app/utils/common.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-mng-form',
  templateUrl: './user-mng-form.component.html',
  styleUrls: ['./user-mng-form.component.scss']
})
export class UserMngFormComponent implements OnInit {

  formData: any = {}
  submitted = false;
  isEditPassword = false;

  constructor(
    private dialogRef: MatDialogRef<UserMngFormComponent>,
    private userMngService: UserMngService,
    @Inject(MAT_DIALOG_DATA) public data,
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if(this.data){
      console.log(this.data);
      this.formData['birthDate']  = CommonUtil.formatDate(this.data['birthDate']);
      this.formData['role'] = this.data['roleId'];
      this.formData['email'] = this.data['email'];
      this.formData['userName'] = this.data['userName'];
      this.formData['gender'] = this.data['gender'];
      this.formData['fullName'] = this.data['fullName'];
      console.log(this.formData);
    }
    if(!this.formData.role){
      this.formData['role'] = 'ROLE001'
    }
    if(this.formData.gender == undefined){
      this.formData['gender'] = true;
    }
  }

  submit(isInvalid){

    this.submitted = true;
    if(!isInvalid){
      console.log(this.formData);
      this.formData['dob'] = new Date(this.formData.birthDate).toLocaleDateString()

      if(this.data){
        this.userMngService.updateUser(this.formData).subscribe(res=>{
          console.log(res);
          if(res.status){
            this.dialogRef.close(res.status);
          }
          if(res.email){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Email này đã tồn tại!',
              showConfirmButton: false,
              timer: 1500
            })}
        })
      }else{
        this.userMngService.addUser(this.formData).subscribe(res=>{
        console.log(res);
        if(res.status){
          this.dialogRef.close(res.status);
        }
        if(res.userName){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Tài khoản này đã tồn tại!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        if(res.email){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Email này đã tồn tại!',
            showConfirmButton: false,
            timer: 1500
          })        }
        })
      }

    }


  }

  close(){
    this.dialogRef.close();
  }

}
