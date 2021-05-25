import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FileMetadata } from '../../../models/FileMetadata';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit, AfterViewInit {

  filesMetaDataSource: MatTableDataSource<FileMetadata>;
  displayedColumns: string[];

  router: Router

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  showOwner: boolean = true;

  constructor(router: Router) {
    this.filesMetaDataSource = new MatTableDataSource();
    this.router = router;
  }

  ngOnInit(): void {
    if(this.showOwner) {
      this.displayedColumns = ["fileName", "ownerName", "ownerEmail", "size", "uploadTimestamp", "publicFlag"]
    } else {
      this.displayedColumns = ["fileName", "size", "uploadTimestamp", "publicFlag"]
    }
  }

  ngAfterViewInit(): void {
    this.filesMetaDataSource.paginator = this.paginator;
    this.filesMetaDataSource.sort = this.sort;
  }

  setFilesMetadata(observable: Observable<FileMetadata[]>) {
    observable.subscribe(filesMetaData => {
      this.filesMetaDataSource = new MatTableDataSource(filesMetaData);
      this.filesMetaDataSource.paginator = this.paginator;
      this.filesMetaDataSource.sort = this.sort;
    })
  }

  navigateToFileDetails(fileMetaData: FileMetadata) {
    this.router.navigate(["/file-details", fileMetaData.fileKey], {state: {data: fileMetaData}});
  }
}
