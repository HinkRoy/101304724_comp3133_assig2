import { Component } from '@angular/core';
import {Employee} from "../type";
import {Apollo, gql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const CREATE_EMPLOYEE = gql`
  mutation addNewEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
    addNewEmployee(employee: {
      first_name: $firstName,
      last_name: $lastName,
      email: $email,
      gender: $gender,
      salary: $salary
    }) {
      id,
      first_name,
      last_name,
      email,
      gender,
      salary
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployeeById($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
    updateEmployeeById(id: $id, employee: {
      first_name: $firstName,
      last_name: $lastName,
      email: $email,
      gender: $gender,
      salary: $salary
    }) {
      id,
      first_name,
      last_name,
      email,
      gender,
      salary
    }
  }
`;

const GET_EMPLOYEE_DETAIL = gql`
  query searchEmployeeById($id: ID!) {
    searchEmployeeById(id: $id) {
      id,
      first_name,
      last_name,
      email,
      gender,
      salary
    }
  }
`;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee | null = null
  firstName: string = ""
  lastName: string = ""
  email: string = ""
  gender: string = ""
  salary: string = ""

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id !== '_add') {
        this.apollo.query<Employee>({
          query: GET_EMPLOYEE_DETAIL,
          variables: { id: params.id }
        }).subscribe((result: any) => {
          this.employee = result.data.searchEmployeeById;
          this.firstName = this.employee?.first_name || ""
          this.lastName = this.employee?.last_name || ""
          this.email = this.employee?.email || ""
          this.gender = this.employee?.gender || ""
          this.salary = "" + this.employee?.salary
        });
      }
    })
  }

  save(): void {
    if (this.firstName && this.lastName && this.email && this.gender && this.salary) {
      if (this.employee) {
        this.apollo.mutate({
          mutation: UPDATE_EMPLOYEE,
          variables: {
            id: this.employee.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            gender: this.gender,
            salary: Number(this.salary),
          }
        }).subscribe((res: any) => {
          this._snackBar.open("Update Employee successful!");
          this.router.navigateByUrl('/')
        }, error => {
          this._snackBar.open("Update Employee error!");
        })
      } else {
        this.apollo.mutate({
          mutation: CREATE_EMPLOYEE,
          variables: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            gender: this.gender,
            salary: Number(this.salary),
          }
        }).subscribe((res: any) => {
          this._snackBar.open("Create Employee successful!");
          this.router.navigateByUrl('/')
        }, error => {
          this._snackBar.open("Create Employee error!");
        })
      }
    }
  }

  cancel(): void {
    this.router.navigateByUrl("/");
  }
}
