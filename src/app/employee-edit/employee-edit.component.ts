import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  maxDate;
  maxDateHD;


  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDateHD = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDateHD.setFullYear(this.maxDateHD.getFullYear());

    this.employeeForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      DoB: new FormControl('', {validators: [Validators.required]}),
      username: new FormControl('', { validators: [Validators.required] }),
      hiredate: new FormControl('', { validators: [Validators.required] }),
      countries: new FormControl('', { validators: [Validators.required] })
    });
  }

}
