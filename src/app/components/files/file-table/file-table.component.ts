import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FileMetaData } from '../../../models/FileMetaData';
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

  filesMetaDataSource: MatTableDataSource<FileMetaData>;
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
      this.displayedColumns = ["fileName", "ownerName", "ownerEmail", "size", "uploadDate", "publicFlag"]
    } else {
      this.displayedColumns = ["fileName", "size", "uploadDate", "publicFlag"]
    }
  }

  ngAfterViewInit(): void {
    this.filesMetaDataSource.paginator = this.paginator;
    this.filesMetaDataSource.sort = this.sort;
  }

  setFilesMetaData(observable: Observable<FileMetaData[]>) {
    observable.subscribe(filesMetaData => {
      this.filesMetaDataSource = new MatTableDataSource(filesMetaData);
      this.filesMetaDataSource.paginator = this.paginator;
      this.filesMetaDataSource.sort = this.sort;
    })
  }

  navigateToFileDetails(fileMetaData: FileMetaData) {
    this.router.navigate(["/file-details", fileMetaData.fileKey], {state: {data: fileMetaData}});
  }
}
