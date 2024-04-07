import { Component } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../type";

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
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee | null = null

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.apollo.query<Employee>({
        query: GET_EMPLOYEE_DETAIL,
        fetchPolicy: 'no-cache',
        variables: { id: params.id }
      }).subscribe((result: any) => {
        this.employee = result.data.searchEmployeeById;
      });
    })
  }
}
