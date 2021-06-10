import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FileTableComponent} from '../files/file-table/file-table.component';
import {UserTableComponent} from '../user-table/user-table.component';

@Component({
  selector: 'app-user-search-result',
  templateUrl: './user-search-result.component.html',
  styleUrls: ['./user-search-result.component.css']
})
export class UserSearchResultComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  phrase: string;

  @ViewChild(UserTableComponent)
  userTable: UserTableComponent;

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.phrase = params.phrase;
      }
    );
  }

  ngAfterViewInit(): void {
    this.userTable.setUserDetails(this.userService.getUsersDetailsByUsernameByPhrase(this.phrase));
  }
}
