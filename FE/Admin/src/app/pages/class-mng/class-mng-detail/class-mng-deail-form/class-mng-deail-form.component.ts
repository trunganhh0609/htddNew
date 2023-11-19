import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassMngService } from 'src/app/services/management/class-mng.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-class-mng-deail-form',
  templateUrl: './class-mng-deail-form.component.html',
  styleUrls: ['./class-mng-deail-form.component.scss']
})

export class ClassMngDeailFormComponent implements OnInit {

  cities: City[];
  lstStudent: [];
  selectedStudents: [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ClassMngDeailFormComponent>,
    private classMngService: ClassMngService
  ) {}

  ngOnInit(): void {
    this.searchStudent()
  }

  searchStudent(){
    this.classMngService.getStudentOption(this.data.lstStudent).subscribe(res=>{
      console.log(res);
      if(res.status){
        this.lstStudent = res.data
      }
    })
  }

  close(){
    this.dialogRef.close()
  }

  save(){
    console.log(this.selectedStudents);
    const param  = {
      lstStudents : this.selectedStudents,
      classId: this.data.classId
    }
    this.classMngService.addStudentToClass(param).subscribe(res=>{
      console.log(res);
      this.dialogRef.close(res.status);
    })
  }

}
