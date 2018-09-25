import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { EmployeesService } from '../services/employees.service';
import { MatSlideToggleModule } from '@angular/material';

import { ICountry } from '../models/country';

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
      username: new FormControl('', { validators: [Validators.required] }),
      hiredate: new FormControl('', { validators: [Validators.required] }),
      countries: new FormControl('', { validators: [Validators.required] }),
      state: new FormControl('', { validators: [Validators.required] }),
      //area: new FormControl('', { validators: [Validators.required] }),
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
  }

  isValid(): boolean{
      
    if (this.employeeForm.valid && this.selectedJob != "" )
      return true;
    else 
      return false;
      
  }
}
