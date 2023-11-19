import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-point-form',
  templateUrl: './create-point-form.component.html',
  styleUrls: ['./create-point-form.component.scss']
})
export class CreatePointFormComponent implements OnInit {

  dataForm: any = {}
  submitted: boolean = false
  constructor(public dialogRef: MatDialogRef<CreatePointFormComponent>) { }

  ngOnInit(): void {
    this.dataForm['half'] = '';
    this.dataForm['full'] = '';
    this.dataForm['late'] = '';
  }

  submit(){
    this.dialogRef.close(this.dataForm);
  }
  close(){
    this.dialogRef.close();
  }
}
