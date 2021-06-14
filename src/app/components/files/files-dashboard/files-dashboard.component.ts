import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {FileTableComponent} from '../file-table/file-table.component';
import {SessionStorageService} from '../../../services/session-storage.service';
import { FileDashboardMode } from './FileDashboardMode';
import {SharedFilesTableMode} from '../shared-files-table/SharedFilesTableMode';
import {FileShareService} from '../../../services/file-share.service';
import {SharedFilesTableComponent} from '../shared-files-table/shared-files-table.component';

@Component({
  selector: 'app-file-dashboard',
  templateUrl: './files-dashboard.component.html',
  styleUrls: ['./files-dashboard.component.css']
})
export class FilesDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('userFiles')
  userFilesTable: FileTableComponent;

  @ViewChild('sharedFiles')
  sharedFilesTable: SharedFilesTableComponent;

  @ViewChild('receiptedFiles')
  receiptedFilesTable: SharedFilesTableComponent;

  fileService: FileService;

  fileShareService: FileShareService;

  sessionStorageService: SessionStorageService;

  fileDashboardMode: FileDashboardMode;

  constructor(fileService: FileService, fileShareService: FileShareService, sessionStorageService: SessionStorageService) {
    this.fileService = fileService;
    this.sessionStorageService = sessionStorageService;
    this.fileShareService = fileShareService;
  }

  ngOnInit(): void {
    this.fileDashboardMode = FileDashboardMode.USER_FILES;
  }

  ngAfterViewInit(): void {
    this.changeDashboardModeToUserFiles()
  }

  changeDashboardModeToUserFiles() {
    this.fileDashboardMode = FileDashboardMode.USER_FILES;
    this.userFilesTable.setFilesMetadata(
      this.fileService.getFilesMetadata(this.sessionStorageService.getEmail(), true)
    );
  }

  isDashboardModeUserFiles(): boolean {
    return this.fileDashboardMode == FileDashboardMode.USER_FILES;
  }

  changeDashboardModeToSharedFiles() {
    this.fileDashboardMode = FileDashboardMode.SHARED_FILES;
    console.log(this.sharedFilesTable);
    this.sharedFilesTable.setFileSharesWithMetadata(
      this.fileShareService.getOwnedFileSharesWithMetadata(this.sessionStorageService.getEmail())
    );
  }

  isDashboardModeSharedFiles(): boolean {
    return this.fileDashboardMode == FileDashboardMode.SHARED_FILES;
  }

  changeDashboardModeToReceiptedFiles() {
    this.fileDashboardMode = FileDashboardMode.RECEIPTED_FILES;
    this.receiptedFilesTable.setFileSharesWithMetadata(
      this.fileShareService.getReceiptedFileSharesWithMetadata(this.sessionStorageService.getEmail())
    );
  }

  isDashboardModeReceiptedFiles(): boolean {
    return this.fileDashboardMode == FileDashboardMode.RECEIPTED_FILES;
  }

  getSharedFilesTableMode(): SharedFilesTableMode {
    return SharedFilesTableMode.OWNER_MODE;
  }

  getReceiptedFilesTableMode(): SharedFilesTableMode {
    return SharedFilesTableMode.RECIPIENT_MODE;
  }
}
