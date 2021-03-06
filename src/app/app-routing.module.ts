import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
    { path: '', component: EmployeesComponent },
    { path: 'newuser', component: EmployeeEditComponent },
    { path: 'userlist', component: EmployeesComponent},
    { path: 'edituser/:id/:id2', component: EmployeeEditComponent },  
    { path: 'edituser/:id', component: EmployeeEditComponent },    
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}
