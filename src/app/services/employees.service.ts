import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { IEmployee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employeesList: AngularFireList<any>;
  selectedEmployee: IEmployee;

  constructor(private firebaseDB: AngularFireDatabase) { }

  getEmployees() {
    return this.employeesList = this.firebaseDB.list('employees');
  }

  createEmployee(employee: IEmployee) {
    this.employeesList.push({
      id: employee.id,
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      country: employee.country,
      userName: employee.userName,
      hireDate: employee.hireDate,
      status: employee.status,
      area: employee.area,
      jobTitle: employee.jobTitle,
      tipRate: employee.tipRate
    });
  }

  updateEmployee(employee: IEmployee) {
/*     this.employeesList.update(employee.$key, {
      id: employee.id,
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      country: employee.country,
      userName: employee.userName,
      hireDate: employee.hireDate,
      status: employee.status,
      area: employee.area,
      jobTitle: employee.jobTitle,
      tipRate: employee.tipRate
    }); */
  }

  deleteEmployee($key: string) {
    this.employeesList.remove($key);
  }
}
