import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Router} from "@angular/router";
import {Employee} from "../type";
import {MatSnackBar} from "@angular/material/snack-bar";

const GET_ALL_EMPLOYEES = gql`
  {
    getAllEmployees {
        id,
        first_name,
        last_name,
        email,
        gender,
        salary
     }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployeeById($id: ID!) {
    deleteEmployeeById(id: $id) {
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
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'gender', 'salary', 'actions'];
  dataSource: Employee[] = [];

  constructor(
    private apollo: Apollo,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
     this.getEmployeeList();
  }

  getEmployeeList() {
    this.apollo.watchQuery<Employee[]>({
      query: GET_ALL_EMPLOYEES,
      fetchPolicy: 'no-cache',
    }).valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.getAllEmployees;
    });
  }

  deleteEmployee(id: string) {
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        id: id,
      }
    }).subscribe((res: any) => {
      this._snackBar.open("Delete Employee successful!");
      this.getEmployeeList();
    }, error => {
      this._snackBar.open("Delete Employee error!");
    })
  }
}
