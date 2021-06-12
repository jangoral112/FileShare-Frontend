import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {FileTableComponent} from '../file-table/file-table.component';
import {SessionStorageService} from '../../../services/session-storage.service';
import { FileDashboardMode } from './FileDashboardMode';
import {SharedFilesTableMode} from '../shared-files-table/SharedFilesTableMode';

@Component({
  selector: 'app-file-dashboard',
  templateUrl: './files-dashboard.component.html',
  styleUrls: ['./files-dashboard.component.css']
})
export class FilesDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(FileTableComponent)
  fileTable: FileTableComponent;

  fileService: FileService;

  sessionStorageService: SessionStorageService;

  fileDashboardMode: FileDashboardMode;

  constructor(fileService: FileService, sessionStorageService: SessionStorageService) {
    this.fileService = fileService;
    this.sessionStorageService = sessionStorageService;
  }

  ngOnInit(): void {
    this.fileDashboardMode = FileDashboardMode.USER_FILES;
  }

  ngAfterViewInit(): void {
    this.fileTable.setFilesMetadata(this.fileService.getFilesMetadata(this.sessionStorageService.getEmail(), true));
  }

  setDashboardModeToUserFiles() {
    this.fileDashboardMode = FileDashboardMode.USER_FILES;
  }

  isDashboardModeUserFiles(): boolean {
    return this.fileDashboardMode == FileDashboardMode.USER_FILES;
  }

  setDashboardModeToSharedFiles() {
    this.fileDashboardMode = FileDashboardMode.SHARED_FILES;
  }

  isDashboardModeSharedFiles(): boolean {
    return this.fileDashboardMode == FileDashboardMode.SHARED_FILES;
  }

  setDashboardModeToReceiptedFiles() {
    this.fileDashboardMode = FileDashboardMode.RECEIPTED_FILES;
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
