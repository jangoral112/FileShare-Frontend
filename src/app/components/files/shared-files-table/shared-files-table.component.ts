import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {FileShareWithMetadata} from '../../../models/FileShareWithMetadata';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SharedFilesTableMode} from './SharedFilesTableMode';
import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-shared-files-table',
  templateUrl: './shared-files-table.component.html',
  styleUrls: ['./shared-files-table.component.css']
})
export class SharedFilesTableComponent implements OnInit, AfterViewInit {

  fileSharesWithMetadataSource: MatTableDataSource<FileShareWithMetadata>;
  selection = new SelectionModel<FileShareWithMetadata>(false, [])
  displayedColumns: string[];

  router: Router;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  mode: SharedFilesTableMode;

  constructor(router: Router) {
    this.fileSharesWithMetadataSource = new MatTableDataSource();
    this.router = router;
  }

  ngOnInit(): void {
    if(this.mode == SharedFilesTableMode.RECIPIENT_MODE) {
      this.displayedColumns = ["fileName", "ownerUsername", "ownerEmail", "shareTimestamp", "size"]
    } else if(this.mode == SharedFilesTableMode.OWNER_MODE) {
      this.displayedColumns = ["fileName", "recipientUsername", "recipientEmail", "shareTimestamp", "size"]
    } else if(this.mode == SharedFilesTableMode.ADMIN_MODE) {
      this.displayedColumns = ["select", "fileName", "ownerUsername", "ownerEmail", "recipientUsername", "recipientEmail", "shareTimestamp", "size"]
    }
  }

  ngAfterViewInit(): void {
    this.fileSharesWithMetadataSource.paginator = this.paginator;
    this.fileSharesWithMetadataSource.sort = this.sort;
  }

  setFileSharesWithMetadata(observable: Observable<FileShareWithMetadata[]>) {
    observable.subscribe(filesMetaData => {
      this.fileSharesWithMetadataSource = new MatTableDataSource(filesMetaData);
      this.fileSharesWithMetadataSource.paginator = this.paginator;
      this.fileSharesWithMetadataSource.sort = this.sort;
    });
  }

  setFilter(filter: string) {
    this.fileSharesWithMetadataSource.filterPredicate = (data: FileShareWithMetadata, filter: string) => {
      return data.fileMetadata.fileName.trim().toLocaleLowerCase().indexOf(filter) != -1
    }
    this.fileSharesWithMetadataSource.filter = filter.trim().toLocaleLowerCase();
  }

  navigateToFileDetails(fileShareWithMetadata: FileShareWithMetadata) {
    this.router.navigate(
      ["/file-details", fileShareWithMetadata.fileMetadata.fileKey],
      { state: { data: fileShareWithMetadata.fileMetadata } }
    );
  }

  navigateToUser(userEmail: string) {
    this.router.navigate(["/user", userEmail]);
  }

  getSelected(): FileShareWithMetadata {
    return this.selection.selected[0]
  }
}
