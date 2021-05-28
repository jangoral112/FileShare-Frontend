import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FileService} from '../../../services/file.service';
import { FileTableComponent } from '../file-table/file-table.component';
import { SessionStorageService } from '../../../services/session-storage.service';

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

  constructor(fileService: FileService, sessionStorageService: SessionStorageService) {
    this.fileService = fileService;
    this.sessionStorageService = sessionStorageService;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.fileTable.setFilesMetadata(this.fileService.getFilesMetadata(this.sessionStorageService.getEmail(), true));
  }
}
