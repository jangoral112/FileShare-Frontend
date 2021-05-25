import { Component, OnInit } from '@angular/core';
import {FileMetadata} from '../../models/FileMetadata';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  constructor() { }

  fileMetaData: FileMetadata;

  ngOnInit(): void {
    this.fileMetaData = history.state.data;
  }

}
