import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserDetails} from '../../models/UserDetails';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, AfterViewInit {

  userDetailsDataSource: MatTableDataSource<UserDetails>;
  displayedColumns: string[];

  router: Router;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(router: Router) {
    this.userDetailsDataSource = new MatTableDataSource<UserDetails>();
    this.router = router;
  }

  ngOnInit(): void {
    this.displayedColumns = ["username", "email", "joinDate"];
  }

  ngAfterViewInit(): void {
    this.userDetailsDataSource.paginator = this.paginator;
    this.userDetailsDataSource.sort = this.sort;
  }

  setUserDetails(observable: Observable<UserDetails[]>) {
    observable.subscribe(filesMetaData => {
      this.userDetailsDataSource = new MatTableDataSource(filesMetaData);
      this.userDetailsDataSource.paginator = this.paginator;
      this.userDetailsDataSource.sort = this.sort;
    })
  }

  navigateToUser(userDetails: UserDetails) {
    this.router.navigate(["/user", userDetails.email]);
  }
}
