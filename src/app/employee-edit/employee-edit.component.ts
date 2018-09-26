import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { EmployeesService } from '../services/employees.service';
import { MatSlideToggleModule } from '@angular/material';

import { ICountry } from '../models/country';
import { IEmployee } from '../models/employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  maxDate;
  maxDateHD;
  errorMessage: string;
  countries: ICountry[];
  employee: IEmployee = {   
    name: "",
    dateOfBirth: null,
    country: "",
    userName: "",
    hireDate: null,
    status: null,
    area: "",
    jobTitle: "",
    tipRate: 0
  };
  areaSelected: string = "services";
  selectedJob: string ="";
  showTipRate: boolean = false;


  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {    
    
    this.maxDate = new Date();
    this.maxDateHD = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDateHD.setFullYear(this.maxDateHD.getFullYear());

    this.employeeForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      DoB: new FormControl('', {validators: [Validators.required]}),
      username: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9-' ]+$/)] }),
      hiredate: new FormControl('', { validators: [Validators.required] }),
      countries: new FormControl('', { validators: [Validators.required] }),
      status: new FormControl('', { validators: [] }),
      area: new FormControl('', { validators: [Validators.required] }),
      tipRate: new FormControl('', { validators: [Validators.required] })
    });

    this.employeesService.getCountries()
    .subscribe(countries => this.countries = countries,
               error => this.errorMessage = <any>error);

    this.onJobSelected(this.selectedJob);
  }

  onJobChanged(areaSelected: any) {
    //console.log(areaSelected);
    this.areaSelected = areaSelected;
  }

  onJobSelected(selectedJob: string) {
    console.log(selectedJob);
    this.selectedJob = selectedJob
    if (this.selectedJob === 'Waitress' || this.selectedJob === 'Dining room manager') {
      this.showTipRate = true;
      this.employeeForm.get('tipRate').clearValidators();
      this.employeeForm.get('tipRate').setValidators([Validators.required]);    
    } else {
      this.showTipRate = false;
      this.employeeForm.get('tipRate').clearValidators();
    }
  }

  onAreaChanged(area: any) {
    console.log("area");
    console.log(area);
    console.log("area");
    if (area === "kitchen") {
      this.showTipRate = false;
      this.employeeForm.get('tipRate').clearValidators();      
    } else if (area === "services" && this.selectedJob === 'Waitress' || this.selectedJob === 'Dining room manager') {
      this.showTipRate = true;
      this.employeeForm.get('tipRate').clearValidators();
      this.employeeForm.get('tipRate').setValidators([Validators.required]); 
       
    }
  }

  onSubmit() {
    console.log(this.employeeForm);
    console.log(this.employee); 
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.dateOfBirth = this.employeeForm.get('DoB').value;
    this.employee.country = this.employeeForm.get('countries').value.name;
    this.employee.userName = this.employeeForm.get('username').value;
    this.employee.hireDate = this.employeeForm.get('hiredate').value;
    this.employee.status = this.employeeForm.get('status').value != "" ? this.employeeForm.get('status').value : false;
    this.employee.area = this.employeeForm.get('area').value;
    this.employee.jobTitle = this.selectedJob;
    this.employee.tipRate = this.employeeForm.get('tipRate').value;

    console.log(this.employeeForm.get('hiredate').value);
    console.log(this.employeeForm.get('DoB').value);
    this.employeesService.createEmployee({ ...this.employee });
  }

  isValid(): boolean{
      
    if (this.employeeForm.valid && this.selectedJob != "" )
      return true;
    else 
      return false;
      
  }
}
