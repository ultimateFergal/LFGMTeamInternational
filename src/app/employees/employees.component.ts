
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { EmployeesService } from '../services/employees.service';

import { IEmployee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'dateOfBirth', 'userName', 'hireDate']; // Display order
  dataSource = new MatTableDataSource<IEmployee>();

  @ViewChild(MatSort) sort: MatSort; // Access to the set up of the table
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeesService: EmployeesService, private router: Router) { }

  employeesList: IEmployee[];

  ngOnInit() {   

    this.employeesService.getEmployees()
      .snapshotChanges()
      .subscribe(item => {
        this.employeesList = []
        item.forEach( element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.employeesList.push( x as IEmployee);
          this.dataSource.data = this.employeesList;
          console.log(this.dataSource.data);
        })
      })

    //this.dataSource.data = this.employeesList;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  addNewUser() {
    this.router.navigate(['newuser'])
  }
}
