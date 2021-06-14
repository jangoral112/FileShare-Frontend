import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminPanelMode} from './AdminPanelMode';
import {FileTableComponent} from '../files/file-table/file-table.component';
import {SharedFilesTableComponent} from '../files/shared-files-table/shared-files-table.component';
import {UserTableComponent} from '../user-table/user-table.component';
import {SharedFilesTableMode} from '../files/shared-files-table/SharedFilesTableMode';
import {FileService} from '../../services/file.service';
import {FileShareService} from '../../services/file-share.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

  adminPanelMode: AdminPanelMode;

  @ViewChild('files')
  fileTable: FileTableComponent;

  @ViewChild('shares')
  shareTable: SharedFilesTableComponent;

  @ViewChild('users')
  userTable: UserTableComponent;

  constructor(private fileService: FileService, private fileShareService: FileShareService,
              private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.changeAdminPanelModeToFiles()
  }

  public doFilter(value: string)  {
    switch (this.adminPanelMode) {
      case AdminPanelMode.FILES_MODE: {
        this.fileTable.setFilter(value);
        break;
      }
      case AdminPanelMode.SHARES_MODE: {
        this.shareTable.setFilter(value);
        break;
      }
      case AdminPanelMode.USERS_MODE: {
        this.userTable.setFilter(value);
        break;
      }
    }
  }

  changeAdminPanelModeToFiles() {
    this.adminPanelMode = AdminPanelMode.FILES_MODE;
    this.fileTable.setFilesMetadata(
      this.fileService.getFilesMetadata(null, true)
    );
  }

  public isAdminPanelModeFiles(): boolean {
    return this.adminPanelMode == AdminPanelMode.FILES_MODE;
  }

  changeAdminPanelModeToShares() {
    this.adminPanelMode = AdminPanelMode.SHARES_MODE;
    this.shareTable.setFileSharesWithMetadata(
      this.fileShareService.getFileSharesWithMetadata()
    );
  }

  public isAdminPanelModeShares(): boolean {
    return this.adminPanelMode == AdminPanelMode.SHARES_MODE;
  }

  changeAdminPanelModeToUsers() {
    this.adminPanelMode = AdminPanelMode.USERS_MODE;
    this.userTable.setUserDetails(
      this.userService.getUsersDetails()
    );
  }

  public isAdminPanelModeUsers(): boolean {
    return this.adminPanelMode == AdminPanelMode.USERS_MODE;
  }

  getAdminSharedFilesTableMode(): SharedFilesTableMode {
    return SharedFilesTableMode.ADMIN_MODE;
  }

  deleteSelectedFileShare() {
    let fileShare = this.shareTable.getSelected();
    this.fileShareService.deleteFileShare(fileShare.fileMetadata.fileKey, fileShare.recipientEmail).subscribe(
      next => {
        this.toastr.success(next.body);
      },
      error => {
        this.toastr.error(error.error.message, error.status);
      }
    )
  }
}
