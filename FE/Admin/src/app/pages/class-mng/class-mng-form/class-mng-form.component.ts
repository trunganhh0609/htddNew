import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassMngService } from 'src/app/services/management/class-mng.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-mng-form',
  templateUrl: './class-mng-form.component.html',
  styleUrls: ['./class-mng-form.component.scss']
})
export class ClassMngFormComponent implements OnInit {

  formData = {};
  submitted = false;
  keySearch = '';
  lstTeacher = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ClassMngFormComponent>,
    private classMngService: ClassMngService
  ) { }

  ngOnInit(): void {
    if(this.data){
      console.log(this.data);

      this.formData = this.data;
    }
  }

  submit(invalid) {
    if(!invalid){
      if(this.data){
        Swal.fire({
          title: "Cập nhật lớp học?",
          text: "Bạn có chắc chắn muốn cập nhật không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK"
        }).then((result) => {
          console.log(this.formData);
          this.classMngService.updateClass(this.formData).subscribe(result => {
            this.dialogRef.close(result.status);
          })
        });
      }else{
       this.classMngService.addClass(this.formData).subscribe(result => {
          this.dialogRef.close(result.status)
        })
      }

    }
  }

  close() {
    this.dialogRef.close();
  }

  onSearchTeacher(event: any) {
    console.log(event.target.value);
    if (event.target.value.trim() != '') {
      this.classMngService.searchTeacher(event.target.value).subscribe(res => {
        if (res.status) {
          this.lstTeacher = res.data;
        }
      })
    }
  }

  onChangeTeacher(userId){
    if(this.data){
      this.formData['newTeacherId'] = userId;
    }else{
      this.formData['teacherId'] = userId;
    }
  }

}
