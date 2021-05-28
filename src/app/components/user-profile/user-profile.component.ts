import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDetails} from '../../models/UserDetails';
import {FileTableComponent} from '../files/file-table/file-table.component';
import {FileService} from '../../services/file.service';
import {SessionStorageService} from '../../services/session-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  @ViewChild(FileTableComponent)
  fileTable: FileTableComponent;

  userDetails: UserDetails;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private fileService: FileService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const email = params['email'];
        this.userService.getUserData(email).subscribe(
          userDetails => {
            this.userDetails = userDetails;
          });
      }
    );
  }

  ngAfterViewInit(): void {
    this.fileTable.setFilesMetadata(this.fileService.getFilesMetadata(this.sessionStorageService.getEmail(), false));
  }

}
