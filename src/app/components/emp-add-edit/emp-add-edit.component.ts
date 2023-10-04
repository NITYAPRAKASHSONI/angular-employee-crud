import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {HttpStatusCode} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = [
    'Metric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'PostGraduate'
  ]

  constructor(private _fb: FormBuilder,
              private _empService: EmployeeService,
              private _dialogueRef: MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _coreService:CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
      action: ''

    })

  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee Update')
            this._dialogueRef.close(true)
          },
          error: (err: any) => {
            console.log(HttpStatusCode.InternalServerError)
            console.error(err)
          }
        })

      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added Successfully','done')
            this._dialogueRef.close(true)
          },
          error: (err: any) => {
            console.log(HttpStatusCode.InternalServerError)
            console.error(err)
          }
        })
      }

    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }


}
