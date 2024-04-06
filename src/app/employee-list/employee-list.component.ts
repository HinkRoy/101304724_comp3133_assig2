import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Router} from "@angular/router";
import {Employee} from "../type";

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
  ) {
  }

  ngOnInit(): void {
     this.apollo.watchQuery<Employee[]>({
      query: GET_ALL_EMPLOYEES
    }).valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.getAllEmployees;
     });
  }
}
