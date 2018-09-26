import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmployee } from '../models/employee';
//import { ICountry } from '../models/country';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private countriesUrl = 'https://restcountries.eu/rest/v2/all';
  //private countriesUrl = 'api/countries/countries.json';

  employeesList: AngularFireList<any>;
  selectedEmployee: IEmployee;

  constructor(private firebaseDB: AngularFireDatabase, private http: Http) { }

  getEmployees() {
    return this.employeesList = this.firebaseDB.list('employees');
  }

  createEmployee(employee: IEmployee) {
    this.employeesList.push({
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
        this.employeesList.update(employee.$key, {
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

  deleteEmployee($key: string) {
    this.employeesList.remove($key);
  }

  getCountries(): Observable<any> {
    return this.http.get(this.countriesUrl)
      .map(this.extractData)
      //.do(data => console.log('getCountries: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    //let body = response.json();
    let body = <any[]>response.json();
    //console.log(body);
    //return body.data || {};
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
