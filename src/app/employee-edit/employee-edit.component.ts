import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  paramId: string;


  constructor(private employeesService: EmployeesService, 
              private router: Router, 
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {    

    this.route.paramMap.subscribe(params => {
      this.paramId = params.get('id');
      if (this.paramId) {
        console.log("this.paramId");
        console.log(this.paramId);
        this.employeesService.getEmployee(this.paramId)    .subscribe(item => {
          //console.log(item);
          //return item;
          this.areaSelected = item.area;
          this.selectedJob = item.jobTitle;
          console.log(item);
          this.employeeForm.patchValue({
            name: item.name,
            DoB: new Date(item.dateOfBirth),
            username: item.userName,
            hiredate: new Date(item.hireDate),
            countries: item.country,
            status: item.status,
            area: item.status,
            tipRate: item.tipRate,
            
          });
        });
      } else {
        console.log("NOedit");
      }
    });
    
    
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
    //console.log(selectedJob);
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
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.dateOfBirth = this.employeeForm.get('DoB').value;
    this.employee.country = this.employeeForm.get('countries').value.name;
    this.employee.userName = this.employeeForm.get('username').value;
    this.employee.hireDate = this.employeeForm.get('hiredate').value;
    this.employee.status = this.employeeForm.get('status').value != "" ? this.employeeForm.get('status').value : false;
    this.employee.area = this.employeeForm.get('area').value;
    this.employee.jobTitle = this.selectedJob;
    this.employee.tipRate = this.employeeForm.get('tipRate').value;

    if (!this.paramId) {
      this.employeesService.createEmployee({ ...this.employee });
    } else {
      this.employeesService.updateEmployee({ ...this.employee });
    }
    this.router.navigate(['userlist'])
  }

  isValid(): boolean{
      
    if (this.employeeForm.valid && this.selectedJob != "" )
      return true;
    else 
      return false;
      
  }

  goToUserList() {
    this.router.navigate(['userlist'])
  }
}
