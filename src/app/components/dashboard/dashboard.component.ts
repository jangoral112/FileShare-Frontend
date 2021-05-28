import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FileTableComponent} from '../files/file-table/file-table.component';
import {FileService} from '../../services/file.service';
import {SessionStorageService} from '../../services/session-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(FileTableComponent)
  fileTable: FileTableComponent;

  fileService: FileService;

  sessionStorageService: SessionStorageService;

  constructor(fileService: FileService, sessionStorageService: SessionStorageService) {
    this.fileService = fileService;
    this.sessionStorageService = sessionStorageService;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fileTable.setFilesMetadata(this.fileService.getFilesMetadata(null, true));
  }

}
